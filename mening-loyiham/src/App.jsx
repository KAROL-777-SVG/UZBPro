
import { useState } from "react";
import {
  Sparkles,
  FileText,
  BriefcaseBusiness,
  Contact,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  LayoutTemplate,
  ShieldCheck,
  Palette,
} from "lucide-react";
import "./App.css";

const modules = [
  {
    id: "taklifnoma",
    title: "Taklifnoma",
    description:
      "To‘y, tug‘ilgan kun va boshqa tadbirlar uchun chiroyli taklifnomalar yarating.",
    icon: FileText,
    number: "01",
    color: "gold",
  },
  {
    id: "resume",
    title: "Resume",
    description:
      "Tajriba, ta’lim va ko‘nikmalaringizni zamonaviy Resume ko‘rinishida taqdim eting.",
    icon: BriefcaseBusiness,
    number: "02",
    color: "purple",
  },
  {
    id: "vizitka",
    title: "Vizitka",
    description:
      "Shaxsiy yoki kompaniyangiz uchun professional vizitka tayyorlang.",
    icon: Contact,
    number: "03",
    color: "blue",
  },
];

function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({});

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function openModule(module) {
    setActiveModule(module);
    setForm({});
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitProject(event) {
    event.preventDefault();

    const saved = {
      id: Date.now(),
      type: activeModule.title,
      createdAt: new Date().toLocaleDateString("uz-UZ"),
      data: form,
    };

    const oldProjects = JSON.parse(
      localStorage.getItem("uzbpro-projects") || "[]"
    );

    localStorage.setItem(
      "uzbpro-projects",
      JSON.stringify([saved, ...oldProjects])
    );

    alert("Loyihangiz ushbu qurilmada saqlandi!");
    setActiveModule(null);
    setForm({});
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <a
          href="#home"
          className="brand"
          onClick={() => setActiveModule(null)}
        >
          <span className="brand-symbol">
            <Sparkles size={23} />
          </span>
          <span>UZB<span className="gold-text">Pro</span></span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Menyuni ochish"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={mobileMenu ? "nav-links show" : "nav-links"}>
          <a href="#home" onClick={() => setActiveModule(null)}>Bosh sahifa</a>
          <a href="#modules" onClick={() => setMobileMenu(false)}>Modullar</a>
          <a href="#features" onClick={() => setMobileMenu(false)}>Imkoniyatlar</a>
          <button className="nav-cta" onClick={() => openModule(modules[0])}>
            Boshlash <ArrowRight size={16} />
          </button>
        </nav>
      </header>

      {activeModule ? (
        <main className="workspace">
          <button
            className="back-button"
            onClick={() => setActiveModule(null)}
          >
            ← Bosh sahifaga qaytish
          </button>

          <div className="workspace-heading">
            <span className="eyebrow">YANGI LOYIHA</span>
            <h1>{activeModule.title} <span className="gold-text">yaratish</span></h1>
            <p>Ma’lumotlarni kiriting va loyihangizni saqlang.</p>
          </div>

          <form className="project-form" onSubmit={submitProject}>
            {activeModule.id === "taklifnoma" && (
              <>
                <label>
                  Tadbir nomi *
                  <input
                    name="eventName"
                    placeholder="Masalan, Nikoh to‘yi"
                    required
                    value={form.eventName || ""}
                    onChange={updateField}
                  />
                </label>
                <div className="form-row">
                  <label>
                    Sana *
                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date || ""}
                      onChange={updateField}
                    />
                  </label>
                  <label>
                    Vaqt *
                    <input
                      type="time"
                      name="time"
                      required
                      value={form.time || ""}
                      onChange={updateField}
                    />
                  </label>
                </div>
                <label>
                  Manzil *
                  <input
                    name="address"
                    placeholder="Tadbir manzili"
                    required
                    value={form.address || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Tadbir turi
                  <select name="eventType" value={form.eventType || "To‘y"} onChange={updateField}>
                    <option>To‘y</option>
                    <option>Tug‘ilgan kun</option>
                    <option>Fotiha yoki unashtiruv</option>
                    <option>Rasmiy tadbir</option>
                    <option>Boshqa tadbir</option>
                  </select>
                </label>
              </>
            )}

            {activeModule.id === "resume" && (
              <>
                <label>
                  To‘liq ism *
                  <input
                    name="fullName"
                    placeholder="Ism va familiya"
                    required
                    value={form.fullName || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Email *
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    required
                    value={form.email || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Kasbiy maqsad *
                  <textarea
                    name="objective"
                    placeholder="Kasbiy maqsadingiz haqida yozing..."
                    required
                    value={form.objective || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Ta’lim
                  <textarea
                    name="education"
                    placeholder="Ta’lim muassasasi va yo‘nalish"
                    value={form.education || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Ko‘nikmalar
                  <textarea
                    name="skills"
                    placeholder="HTML, CSS, JavaScript..."
                    value={form.skills || ""}
                    onChange={updateField}
                  />
                </label>
              </>
            )}

            {activeModule.id === "vizitka" && (
              <>
                <label>
                  Ism yoki kompaniya nomi *
                  <input
                    name="name"
                    placeholder="Ism yoki kompaniya nomi"
                    required
                    value={form.name || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Kasb yoki lavozim
                  <input
                    name="profession"
                    placeholder="Masalan, Web dasturchi"
                    value={form.profession || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Telefon
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+998"
                    value={form.phone || ""}
                    onChange={updateField}
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    value={form.email || ""}
                    onChange={updateField}
                  />
                </label>
              </>
            )}

            <label>
              Qo‘shimcha ma’lumot
              <textarea
                name="notes"
                placeholder="Ixtiyoriy ma’lumot..."
                value={form.notes || ""}
                onChange={updateField}
              />
            </label>

            <button className="primary-button" type="submit">
              Loyihani saqlash <ArrowRight size={18} />
            </button>
            <p className="form-note">
              Hozircha ma’lumotlar ushbu brauzerda saqlanadi.
            </p>
          </form>
        </main>
      ) : (
        <>
          <main id="home">
            <section className="hero">
              <div className="hero-content">
                <div className="eyebrow">
                  <Sparkles size={15} /> IJOD UCHUN YANGI IMKONIYAT
                </div>

                <h1>
                  G‘oyalaringizni
                  <br />
                  <span className="gold-text">professional</span>
                  <br />
                  ko‘rinishga keltiring.
                </h1>

                <p className="hero-description">
                  Taklifnoma, Resume va Vizitkalarni bitta platformada
                  yarating. Sodda, zamonaviy va sizning uslubingizda.
                </p>

                <div className="hero-actions">
                  <a className="primary-button" href="#modules">
                    Bepul boshlash <ArrowRight size={18} />
                  </a>
                  <a className="secondary-button" href="#features">
                    Imkoniyatlarni ko‘rish
                  </a>
                </div>

                <div className="hero-trust">
                  <span><CheckCircle2 size={16} /> Boshlanishida bepul</span>
                  <span><ShieldCheck size={16} /> Sodda va qulay</span>
                </div>
              </div>

              <div className="hero-art" aria-label="Platforma imkoniyatlari">
                <div className="art-glow" />
                <div className="floating-card card-back">
                  <span className="mini-label">YOUR NEXT CHAPTER</span>
                  <div className="resume-lines">
                    <i /><i /><i /><i />
                  </div>
                  <span className="card-caption">Resume Studio</span>
                </div>
                <div className="floating-card card-front">
                  <div className="invitation-decoration">✳</div>
                  <span className="mini-label">A SPECIAL MOMENT</span>
                  <h2>Save the<br />Date</h2>
                  <div className="invitation-rule" />
                  <p>Elegant. Personal. Yours.</p>
                </div>
                <div className="floating-card card-small">
                  <Contact size={25} />
                  <span>YOUR IDENTITY</span>
                  <strong>Vizitka</strong>
                </div>
                <div className="art-orbit orbit-one" />
                <div className="art-orbit orbit-two" />
              </div>
            </section>

            <section className="stats">
              <div><strong>03</strong><span>Asosiy modul</span></div>
              <div><strong>10+</strong><span>Dizayn imkoniyatlari</span></div>
              <div><strong>100%</strong><span>Ijodiy erkinlik</span></div>
            </section>
          </main>

          <section className="modules-section" id="modules">
            <div className="section-heading">
              <span className="eyebrow">BIZNING PLATFORMAMIZ</span>
              <h2>Bir platforma. <span className="gold-text">Uch imkoniyat.</span></h2>
              <p>O‘zingizga kerakli bo‘limni tanlang va yaratishni boshlang.</p>
            </div>

            <div className="module-grid">
              {modules.map((module) => {
                const Icon = module.icon;

                return (
                  <article className="module-card" key={module.id}>
                    <div className="module-top">
                      <span className={`module-icon ${module.color}`}>
                        <Icon size={25} />
                      </span>
                      <span className="module-number">{module.number}</span>
                    </div>
                    <h3>{module.title}</h3>
                    <p>{module.description}</p>
                    <button
                      className="module-link"
                      onClick={() => openModule(module)}
                    >
                      Yaratishni boshlash <ArrowRight size={17} />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="features-section" id="features">
            <div className="section-heading">
              <span className="eyebrow">NIMA UCHUN UZBPRO?</span>
              <h2>Hammasi <span className="gold-text">bir joyda.</span></h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <LayoutTemplate size={25} />
                <h3>Tayyor andozalar</h3>
                <p>Yaratishni tez boshlash uchun andozalardan foydalaning.</p>
              </article>
              <article className="feature-card">
                <Palette size={25} />
                <h3>O‘z uslubingiz</h3>
                <p>Ranglar va matnlar bilan loyihangizni shaxsiylashtiring.</p>
              </article>
              <article className="feature-card">
                <ShieldCheck size={25} />
                <h3>Saqlash imkoniyati</h3>
                <p>Hozirgi versiyada loyihalar brauzeringizda saqlanadi.</p>
              </article>
            </div>
          </section>
        </>
      )}

      <footer className="footer">
        <a href="#home" className="brand">
          <span className="brand-symbol"><Sparkles size={20} /></span>
          <span>UZB<span className="gold-text">Pro</span></span>
        </a>
        <p>G‘oyalaringizga professional ko‘rinish bering.</p>
        <span className="copyright">© {new Date().getFullYear()} UZBPro</span>
      </footer>
    </div>
  );
}

export default App;
