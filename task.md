# Task List (Uygulama Görevleri)

Aşağıdaki liste, PRD'ye dayalı uygulanması gereken görevleri, tahmini süreleri ve önceliklerini içerir. Öncelik yüksekten düşüğe.

1) Proje Kurulumu — 2 gün (Yüksek)
- GitHub repo oluştur, .gitignore, README.md
- Next.js proje başlat (`npx create-next-app` veya tercih edilen scaffold)
- Vercel/Netlify bağlantısı ve branch preview yapılandırması

2) Tasarım Sistemi & Stil Tokenları — 4 gün (Yüksek)
- Tailwind kurulumu ve konfigürasyonu
- Renk paleti ve tipografi tokenları (`/styles/tokens.css` veya tailwind config)
- Temel bileşenler: Button, Card, Badge, Nav, Footer (Storybook opsiyonel)

3) CMS Entegrasyonu & Veri Modeli — 3 gün (Yüksek)
- Sanity veya Netlify CMS yapılandırması
- Şemalar: Post, Author, Idea, Tag, Category
- Preview endpoint ve yayın iş akışı testi

4) Post List & Post Detail Şablonları — 4 gün (Yüksek)
- Post kartları, meta veriler, sayfa şablonları (SSG + ISR)
- Okunabilir satır uzunluğu ve tipografi kontrolü

5) Arama, Etiketler & Kategoriler — 3 gün (Orta)
- Basit arama implementasyonu (client-side veya MeiliSearch)
- Tag ve Category arşiv sayfaları

6) RSS, SEO & Sitemap — 2 gün (Yüksek)
- `/rss.xml`, `sitemap.xml` oluşturma
- OpenGraph & meta tag şablonları

7) Dark Mode & Responsive Polish — 2 gün (Yüksek)
- Sistem tercihini takip eden ve kullanıcı seçimini saklayan toggle
- Mobil düzen optimizasyonu

8) Yorum Sistemi & Moderasyon — 3 gün (Orta)
- Utterances veya Commento entegrasyonu
- Moderasyon/Onay akışı testleri

9) Testler ve Erişilebilirlik Denetimi — 4 gün (Yüksek)
- Unit testler (Jest + RTL)
- E2E smoke testleri (Playwright)
- Lighthouse CI yapılandırması

10) İçerik Doldurma ve QA — 3 gün (Yüksek)
- 10 başlangıç yazısının yayımlanması
- Görsel lisans kayıtlarının toplanması

11) Yayın & İzleme — 1 gün (Yüksek)
- Prod deploy, DNS yönlendirme (varsa), analytics kurulum

---
Notlar:
- Toplam MVP tahmini süre: 33 iş günü. Görevler paralelleştirilebilir; dev + tasarım aynı anda çalışırsa süre kısalır.
- İlerleme için her ana adım sonunda kısa bir demo/preview deploy yapılmalıdır.

İsterseniz şimdi: 1) Bu dosyaları repoya commit edip ilk branch'i hazırlayayım, veya 2) doğrudan Next.js scaffold yapıp temel dizini oluşturmaya başlayayım. Hangi adımı istiyorsunuz?