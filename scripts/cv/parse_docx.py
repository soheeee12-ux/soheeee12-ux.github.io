"""
CV.docx (실제 사용 중인 CV 형식)를 읽어서 cv-data.json으로 변환하는 스크립트.
실행: python scripts/cv/parse_docx.py
"""

import json
import re
from pathlib import Path

from docx import Document
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table
from docx.text.paragraph import Paragraph

ROOT = Path(__file__).resolve().parents[2]
DOCX_PATH = ROOT / "CV.docx"
OUTPUT_PATH = ROOT / "src" / "generated" / "cv-data.json"

MAJOR_HEADINGS = {
    "EDUCATION": "education",
    "RESEARCH INTEREST": "researchInterests",
    "JOURNAL PUBLICATIONS": "journalArticles",
    "OTHER PUBLICATIONS": "otherPublications",
    "PAPERS IN PREPARATION": "papersInProgress",
    "GRANTS, AWARDS, & HONORS": "grants",
    "SELECTED CONFERENCE PRESENTATIONS": "conferencePresentations",
    "RESEARCH EXPREIENCES": "researchExperience",
    "RESEARCH EXPERIENCES": "researchExperience",
    "TEACHING EXPERIENCE": "teaching",
    "LANGUAGES & SOFTWARE SKILLS": "languages",
    "PROFESSIONAL ACTIVITIES & SERVICE": "service",
    "TRAINING": "training",
    "INVITED TALKS": "invitedTalks",
}

STATUS_KEYWORDS = ["Revise and Resubmit", "Under Review", "In Progress", "Forthcoming"]


def iter_block_items(document: Document):
    body = document.element.body
    for child in body.iterchildren():
        if isinstance(child, CT_P):
            yield "p", Paragraph(child, document)
        elif isinstance(child, CT_Tbl):
            yield "tbl", Table(child, document)


def clean(text: str) -> str:
    return re.sub(r"\s+", " ", text.replace("\u2019", "'")).strip()


def split_status(text: str):
    for kw in STATUS_KEYWORDS:
        pattern = rf"\.\s*{re.escape(kw)}\.\s*"
        m = re.search(pattern, text)
        if m:
            citation = (text[: m.start()] + ". " + text[m.end():]).strip()
            return clean(citation), kw
    return clean(text), ""


def merge_continuation_rows(rows):
    """col0(연도)가 비어 있으면 이전 행의 연장으로 보고 col1을 이어붙임."""
    merged = []
    for row in rows:
        cells = [c.strip() for c in row]
        if not any(cells):
            continue
        if cells[0] == "" and merged:
            merged[-1] = [
                merged[-1][i] + ("\n" + cells[i] if cells[i] else "")
                for i in range(len(cells))
            ]
        else:
            merged.append(cells)
    return merged


def parse_education_table(table: Table):
    rows = merge_continuation_rows([[c.text for c in r.cells] for r in table.rows])
    items = []
    for cells in rows:
        year = cells[0]
        body = cells[1] if len(cells) > 1 else ""
        lines = [clean(l) for l in body.split("\n") if clean(l)]
        school = ""
        degree = ""
        note_parts = []
        for line in lines:
            is_school = ("University" in line or "College" in line) and "Dissertation" not in line and "Committee" not in line
            if is_school and not school:
                school = line
            elif not degree and not is_school and "Dissertation" not in line and "Committee" not in line:
                degree = line
            else:
                note_parts.append(line)
        items.append({
            "year": year,
            "degree": degree,
            "school": school,
            "note": " ".join(note_parts),
        })
    return items


def parse_year_text_table(table: Table):
    rows = merge_continuation_rows([[c.text for c in r.cells] for r in table.rows])
    items = []
    for cells in rows:
        if len(cells) < 2:
            continue
        items.append({"year": clean(cells[0]), "text": clean(cells[1])})
    return items


def parse_research_experience_table(table: Table):
    rows = merge_continuation_rows([[c.text for c in r.cells] for r in table.rows])
    items = []
    for cells in rows:
        year = clean(cells[0])
        body = cells[1] if len(cells) > 1 else ""
        lines = [clean(l) for l in body.split("\n") if clean(l)]
        role_line = lines[0] if lines else ""
        project_line = next((l for l in lines if l.startswith("Project:")), "")
        note_lines = [l for l in lines[1:] if not l.startswith("Project:")]
        role, _, advisor = role_line.partition(":")
        items.append({
            "year": year,
            "role": clean(role),
            "advisor": clean(advisor),
            "project": project_line.replace("Project:", "").strip(),
            "note": " ".join(note_lines),
        })
    return items


def parse_teaching_table(table: Table):
    rows = merge_continuation_rows([[c.text for c in r.cells] for r in table.rows])
    courses = []
    certificates = []
    last_role = ""
    for cells in rows:
        year = clean(cells[0]) if len(cells) > 0 else ""
        col1 = clean(cells[1]) if len(cells) > 1 else ""
        col2 = clean(cells[2]) if len(cells) > 2 else ""
        if col1.startswith("Awarded"):
            certificates.append({
                "year": year,
                "title": col1.replace("Awarded", "").strip(),
                "note": col2,
            })
            continue
        role = col1 if col1 else last_role
        last_role = role or last_role
        title_lines = [l.strip() for l in col2.split("\n") if l.strip()]
        title = title_lines[0] if title_lines else ""
        rating = " ".join(title_lines[1:])
        if not title:
            continue
        courses.append({
            "year": year,
            "role": role,
            "title": title,
            "rating": rating,
        })
    return courses, certificates


def main():
    if not DOCX_PATH.exists():
        print(f"CV.docx를 찾을 수 없어요: {DOCX_PATH}")
        return

    document = Document(str(DOCX_PATH))

    result = {
        "education": [],
        "researchInterests": [],
        "journalArticles": [],
        "bookChapters": [],
        "policyReports": [],
        "papersInProgress": [],
        "grants": [],
        "conferencePresentations": [],
        "researchExperience": [],
        "teaching": {"institutions": [], "certificates": []},
        "service": {"reviewer": [], "volunteer": []},
        "training": [],
        "invitedTalks": [],
        "languages": "",
    }

    current_major = None
    current_sub = None
    para_buffer = []  # for paragraph-based sections between headings

    def flush_paragraph_section():
        nonlocal para_buffer
        if not para_buffer:
            return
        if current_major == "researchInterests":
            text = " ".join(para_buffer)
            result["researchInterests"] = [clean(p) for p in text.split(";") if clean(p)]
        elif current_major == "journalArticles":
            result["journalArticles"] = [{"citation": clean(p)} for p in para_buffer]
        elif current_major == "otherPublications":
            if current_sub == "Book Chapter":
                result["bookChapters"] = [{"citation": clean(p)} for p in para_buffer]
            elif current_sub == "Policy Reports":
                result["policyReports"] = [{"citation": clean(p), "url": ""} for p in para_buffer]
        elif current_major == "papersInProgress":
            items = []
            for p in para_buffer:
                if p.strip().startswith(("Recipient", "*", "\u2022")):
                    if items:
                        items[-1]["note"] = clean(p)
                    continue
                citation, status = split_status(p)
                items.append({"citation": citation, "status": status})
            result["papersInProgress"] = items
        elif current_major == "languages":
            result["languages"] = clean(" ".join(para_buffer))
        elif current_major == "service" and current_sub == "Reviewer for Scholarly Journals":
            result["service"]["reviewer"] = [clean(p) for p in para_buffer]
        para_buffer = []

    for kind, block in iter_block_items(document):
        if kind == "p":
            text = block.text.strip()
            if not text:
                continue

            if text in MAJOR_HEADINGS:
                flush_paragraph_section()
                current_major = MAJOR_HEADINGS[text]
                current_sub = None
                continue

            if current_major == "otherPublications" and text in ("Book Chapter", "Policy Reports"):
                flush_paragraph_section()
                current_sub = text
                continue

            if current_major == "service" and text in ("Reviewer for Scholarly Journals", "Volunteers and Services"):
                flush_paragraph_section()
                current_sub = text
                continue

            if current_major == "teaching" and ("University" in text or "College" in text) and len(text) < 100:
                current_sub = text
                continue

            para_buffer.append(text)

        elif kind == "tbl":
            if current_major == "education":
                result["education"] = parse_education_table(block)
            elif current_major == "grants":
                result["grants"] = parse_year_text_table(block)
            elif current_major == "conferencePresentations":
                result["conferencePresentations"] = parse_year_text_table(block)
            elif current_major == "researchExperience":
                result["researchExperience"] = parse_research_experience_table(block)
            elif current_major == "teaching":
                courses, certs = parse_teaching_table(block)
                result["teaching"]["institutions"].append({
                    "name": current_sub or "",
                    "courses": courses,
                })
                result["teaching"]["certificates"].extend(certs)
            elif current_major == "service" and current_sub == "Volunteers and Services":
                result["service"]["volunteer"] = parse_year_text_table(block)
            elif current_major == "training":
                result["training"] = parse_year_text_table(block)
            elif current_major == "invitedTalks":
                result["invitedTalks"] = parse_year_text_table(block)

    flush_paragraph_section()

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print(f"완료: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()