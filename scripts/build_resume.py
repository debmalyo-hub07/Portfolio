from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth

W, H = A4
c = canvas.Canvas("public/resume/Resume.pdf", pagesize=A4)
LM = 52; RM = W - 52; y = H - 52
SERIF = "Times-Roman"; BOLD = "Times-Bold"


def wrap(text, font, size, maxw):
    words = text.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if stringWidth(t, font, size) <= maxw:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    return lines


def para(text, size=9.5, font=SERIF, lead=12.2, maxw=None, x=LM):
    global y
    maxw = maxw or (RM - x)
    for ln in wrap(text, font, size, maxw):
        c.setFont(font, size); c.drawString(x, y, ln); y -= lead


def section(title):
    global y
    y -= 6
    c.setFont(BOLD, 11); c.drawString(LM, y, title); y -= 4
    c.setLineWidth(0.6); c.setStrokeColorRGB(0, 0, 0); c.line(LM, y, RM, y); y -= 13


def link_over(text, url, x, yy, font=SERIF, size=9.5):
    """Register a clickable hotspot over already-drawn text starting at (x, yy)."""
    w = stringWidth(text, font, size)
    c.linkURL(url, (x, yy - 2, x + w, yy + size), relative=0, thickness=0)


# Header
c.setFont(BOLD, 20); c.drawString(LM, y, "Debmalyo Barman")
photo = ImageReader("scripts/assets/resume_photo.png")
pw = 95; ph = pw * 531 / 413
c.drawImage(photo, RM - pw, H - 52 - ph, width=pw, height=ph, mask='auto')
y -= 20
# (label, value, url|None) — value is drawn after the label and linked if url given
contacts = [
    ("Phone: ", "7596810200", None),
    ("Email: ", "debmalyobarman2003@gmail.com", "mailto:debmalyobarman2003@gmail.com"),
    ("LinkedIn: ", "linkedin.com/in/debmalyo-barman", "https://linkedin.com/in/debmalyo-barman"),
    ("GitHub: ", "github.com/debmalyo-hub07", "https://github.com/debmalyo-hub07"),
    ("Portfolio: ", "portfolio-rho-olive-95.vercel.app", "https://portfolio-rho-olive-95.vercel.app"),
]
for label, val, url in contacts:
    c.setFont(SERIF, 9.5); c.drawString(LM, y, label + val)
    if url:
        vx = LM + stringWidth(label, SERIF, 9.5)
        link_over(val, url, vx, y)
    y -= 12.2
y = min(y, H - 52 - ph - 10)

section("OBJECTIVE")
para("Highly motivated Computer Science Engineering student constantly seeking to engage my knowledge to learn something useful and keep challenging myself to be a better performer in accordance to the company's requirements. I want to learn and grow while helping the company.")

section("SKILLS")
for label, val in [("Programming Languages:", "Java, C, JavaScript"), ("Web Technologies:", "HTML, CSS"),
                   ("Frameworks:", "React.js, Node.js"), ("Databases:", "SQL, MongoDB"), ("Version Control:", "Git, GitHub")]:
    c.setFont(BOLD, 9.5); c.drawString(LM, y, label)
    lw = stringWidth(label, BOLD, 9.5)
    c.setFont(SERIF, 9.5); c.drawString(LM + lw + 4, y, " " + val); y -= 12.2

section("EDUCATION")


def edu(deg, inst, dates, extra):
    global y
    c.setFont(BOLD, 9.5); c.drawString(LM, y, deg)
    c.setFont(SERIF, 9.5); c.drawRightString(RM, y, dates); y -= 12
    c.setFont(SERIF, 9.5); c.drawString(LM, y, inst); y -= 11.5
    c.setFont(SERIF, 9.5); c.drawString(LM, y, extra); y -= 13


edu("Bachelor of Technology in Computer Science and Engineering", "Techno Engineering College, Banipur", "2023-2026", "CGPA: 7.54 - 75.4% (Up to 7th semester)")
edu("Bachelor of Technology in Computer Science and Technology", "Canning Government Polytechnic", "2020-2023", "CGPA: 7.95 - 75.7%")
c.setFont(BOLD, 9.5); c.drawString(LM, y, "Secondary Education"); c.setFont(SERIF, 9.5); c.drawRightString(RM, y, "2019"); y -= 12
c.setFont(SERIF, 9.5); c.drawString(LM, y, "Sanskrit Collegiate School"); y -= 11.5
c.setFont(SERIF, 9.5); c.drawString(LM, y, "Percentage: 54.71%"); y -= 13

section("PROJECTS")


def proj(title, body, git=None, sub=None):
    global y
    c.setFont(BOLD, 9.8)
    for ln in wrap(title, BOLD, 9.8, RM - LM):
        c.drawString(LM, y, ln); y -= 12
    if sub:
        c.setFont(SERIF, 9.5); c.drawString(LM, y, sub); y -= 11.8
    if body:
        para(body)
    if git:
        prefix = "GitHub: "
        c.setFont(SERIF, 9.5); c.drawString(LM, y, prefix + git)
        gx = LM + stringWidth(prefix, SERIF, 9.5)
        link_over(git, "https://" + git, gx, y)
        y -= 12.5
    y -= 2


proj("GrandForge Analyzer",
     "Browser-based chess analysis platform powered by Stockfish WASM, featuring multi-engine evaluation, full game review with automatic move classification, live position analysis, and game import from Chess.com and Lichess. Built with React, TypeScript, and a MongoDB Atlas backend deployed on Vercel.",
     git="github.com/debmalyo-hub07/GrandForge-Analyzer")
proj("Smart India Hackathon (SIH) - Crowdsourced Civic Issue Reporting and Resolution System",
     "Developed a mobile-first civic issue reporting platform enabling citizens to submit real-time complaints with photo uploads, automatic location tagging, and status tracking. Implemented issue categorization and automated routing to appropriate municipal departments along with an administrative dashboard for monitoring and resolution.",
     sub="Problem Statement ID: 25031")
proj("Job Portal",
     "Full-stack job portal application enabling interaction between job seekers and recruiters.",
     git="github.com/debmalyo-hub07/job-portal-2.0")
proj("NexMart",
     "Developed a production-grade full-stack e-commerce platform using Next.js, Node.js, MongoDB, and modern web technologies. Implemented secure authentication using NextAuth with OTP verification, complete payment integration using Razorpay with order creation, verification, and webhook handling, and a fully functional admin dashboard for product, order, and user management. Designed a scalable architecture with service-layer backend logic, REST APIs, and optimized UI/UX with dynamic components and state management.",
     git="github.com/debmalyo-hub07/NexMart")

section("LANGUAGES")
para("English, Bengali, Hindi")
section("INTERESTS")
para("Chess, Cricket, Exploring new technologies")

c.setFont(SERIF, 9); c.drawCentredString(W / 2, 30, "1")
c.showPage(); c.save()
print("built, final y approx", round(y))
