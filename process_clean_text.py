import re

with open('src/components/ProposalViewer.tsx', 'r') as f:
    text = f.read()

start_marker = "const PROPOSAL_SECTIONS: SectionData[] = ["
end_marker = "];\n\nexport const ProposalViewer"

start_idx = text.find(start_marker)
end_idx = text.find(end_marker)
block = text[start_idx:end_idx]

section_pattern = re.compile(r'number:\s*(\d+),\s*title:\s*"([^"]+)",\s*wordCount:\s*"([^"]+)",\s*limit:\s*"([^"]+)",\s*content:\s*`([^`]+)`', re.MULTILINE | re.DOTALL)

sections = []
for m in section_pattern.finditer(block):
    sec_num = int(m.group(1))
    sec_title = m.group(2)
    sec_wc = m.group(3)
    sec_limit = m.group(4)
    sec_content = m.group(5).strip()
    
    cleaned = sec_content
    # Remove HTML markup tags
    cleaned = re.sub(r'</?(?:b|u|i|font|br|p|div|span)[^>]*>', '', cleaned)
    
    # Replace arrows
    cleaned = cleaned.replace(' -> ', ' to ')
    cleaned = cleaned.replace('->', ' to ')
    
    # Replace comparison operators
    cleaned = cleaned.replace('>=', 'Greater Than or equal to ')
    cleaned = cleaned.replace('<=', 'Smaller than or equal to ')
    cleaned = cleaned.replace('>', ' Greater Than ')
    cleaned = cleaned.replace('<', ' Smaller than ')
    
    # Clean up multiple spaces
    cleaned = re.sub(r' +', ' ', cleaned)
    
    assert '<' not in cleaned, f"Still has < in section {sec_num}"
    assert '>' not in cleaned, f"Still has > in section {sec_num}"
    
    word_count = len(cleaned.split())
    sections.append((sec_num, sec_title, word_count, cleaned))

# Save to clean text file
with open('PROPOSAL_SUBMISSION_CLEAN_TEXT.txt', 'w') as out:
    for num, title, wc, content in sections:
        out.write(f"================================================================================\n")
        out.write(f"{title}\n")
        out.write(f"Word Count: {wc} words (Limit: 500 words)\n")
        out.write(f"================================================================================\n\n")
        out.write(content + "\n\n\n")

print("Saved clean text to PROPOSAL_SUBMISSION_CLEAN_TEXT.txt")

# Also update the markdown artifact
with open('/Users/kalyan/.gemini/antigravity/brain/4a745499-9949-42ea-8a78-ad09ca61b37d/portal_submission_text.md', 'w') as out:
    out.write("# NESFIC-D-33: Complete Plain-Text Proposal Submission (Clean Form Fields)\n\n")
    out.write("**Lead Applicant:** Ron Hatibaruah  \n")
    out.write("**Target Department:** Directorate of Fisheries, Government of Assam  \n")
    out.write("**Challenge:** North East Seva First Innovation Challenge (NESFIC 2026) • Stream 1  \n")
    out.write("**Budget:** ₹40.0 Lakhs (₹20.0 Lakhs Software Stack Development)  \n")
    out.write("**Live URL:** https://matsyadrishti-assam.pages.dev  \n")
    out.write("**GitHub:** https://github.com/RonHatibaruah/matsyadrishti-assam  \n\n")
    out.write("---\n\n")
    for num, title, wc, content in sections:
        out.write(f"## {title}\n")
        out.write(f"**Word count:** {wc} words (Limit: 500 words)\n\n")
        out.write(content + "\n\n---\n\n")

print("Updated portal_submission_text.md artifact")
