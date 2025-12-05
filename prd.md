# PRD — Minecraft Temalı Modern Blog

## Proje Özeti
Modern, profesyonel görünümlü bir blog sitesi oluşturulacak. Site Minecraft estetiğinden ilham alacak ancak resmi Minecraft varlıkları kullanılmayacak; bunun yerine orijinal voxel/piksel görseller kullanılacak. Site içerik odaklı, erişilebilir ve performans odaklı olacak; editör iş akışını kolaylaştırmak için bir headless CMS ile entegre edilecek.

## Hedefler ve Başarı Metrikleri
- MVP yayınlanması (10 makale, RSS, CI/CD): başarı = MVP prodüksiyonda, RSS çalışıyor. 
- Performans: Lighthouse skorları >= 90 (performans + erişilebilirlik). Core Web Vitals: LCP < 2.5s, CLS < 0.1.
- Kullanıcı edinimi: 3 ay içinde 1.000 aylık sayfa görüntüleme, 100 e-posta abonesi.
- Lisans uyumu: Tüm görsellerin lisans kayıtları mevcut, telifli varlık kullanılmayacak.

## Önerilen Teknik Yığın (Tavsiye)
- Frontend: Next.js (React) — SSG + ISR
- Stiller: Tailwind CSS
- CMS: Sanity (öneri) veya Git tabanlı Netlify CMS
- Barındırma/CD: Vercel (Next.js için önerilir)
- Yorumlar: Utterances (GitHub Issues) veya Commento (gizlilik tercihine göre)
- Arama: MeiliSearch (self-host) veya Algolia (hosted)
- Analitik: Plausible (gizlilik), alternatif GA4

## Tasarım Yönü
- Renk Paleti:
  - Birincil (çim/marka): #2E8B57
  - İkincil (blok/krema): #E5D3B3
  - Aksan (lava/turuncu): #FF7A18
  - Arka plan (açık): #F7F8FA
  - Metin (koyu): #0F1724
  - İkincil metin: #6B7280
  - Karanlık mod arka plan: #0B1220
- Tipografi:
  - Başlık (piksel hissi için): "Press Start 2P" (sınırlı kullanım)
  - Gövde metin: "Inter"
  - Monospace: "JetBrains Mono"
- UI Bileşenleri: üst navigasyon, hero, yazı kartları, yazar kartı, fikir/idea kartları, site footer. Kartlar için hafif bloklu gölgelendirme ve hover lift efekti.
- Görseller: Resmi Minecraft varlıkları kullanılmayacak; MagicaVoxel veya açık lisanslı voxel varlıklar kullanılacak.
- Erişilebilirlik: WCAG AA kontrast, klavye erişilebilirliği, `prefers-reduced-motion` uyumu.

## Yasal / Lisans Notları
- Minecraft logo ve resmi varlıklar Mojang/Microsoft'a aittir; izinsiz kullanım risktir.
- Öneri: Orijinal voxel sanat oluşturulacak veya CC0/CC-BY varlıklar kullanılacak. Lisans kayıtları saklanacak.

## Site Haritası & İçerik Modeli
- Sayfalar: Home, About, Ideas, Posts (index + pagination), Post detail, Categories, Tags, Author, Search, Contact, RSS, Privacy, 404.

- Veri modelleri (özet):
  - Post: id, slug, title, excerpt, body(Markdown/MDX), heroImage, authorId, publishedAt, tags[], categories[], seoTitle, seoDescription, ogImage, readTime.
  - Author: id, name, slug, bio, avatarUrl, socialLinks.
  - Idea: id, title, body, status(idea/draft/accepted), authorId, votes, tags, createdAt.
  - Comment: id, postId, author, body, createdAt, approved.

## Özellik Listesi ve Önceliklendirme
- MVP (yüksek öncelik): içerik yayınlama, responsive liste & makale sayfaları, RSS, temel SEO, dark mode togglee, basit arama.
- Orta: etiket ve kategori arşivleri, yazar sayfaları, yorumlar (moderasyonlu).
- Stretch: PWA, sosyal giriş, kullanıcı reaksiyonları (like/upvote), gelişmiş animasyonlar.

## Performans, SEO, Analitik
- SSG + ISR stratejisi, kritik CSS, resimleri WebP/AVIF ile sunma, LQIP placeholder.
- Yapısal veri (Article schema), sitemap.xml, robots.txt.
- Analitik: Plausible veya GA4; event takibi ile abonelik ve popüler içerik ölçümü.

## Dağıtım, CI/CD, Test
- GitHub + GitHub Actions + Vercel dağıtımı (previews + prod). 
- Testler: Jest + React Testing Library, E2E: Playwright, Lighthouse CI.

## Riskler & Azaltma
- IP riski: Orijinal/CC lisanslı sanat kullan, yasal görüş al.
- Üçüncü taraf performans etkisi: scriptleri lazy-load et.
- Spam/moderasyon: moderasyon kuyruğu ve CAPTCHA veya dış sağlayıcı.

## MVP Kapsamı
- Next.js + Tailwind, Sanity entegrasyonu, ana sayfa, about, idea list, post list/detail, tags/categories, RSS, dark mode, basit arama, analytics.

## Zaman Çizelgesi (Gün bazında tahmini)
- Repo ve infra: 2 gün
- Tasarım sistemi ve tokenlar: 4 gün
- CMS modelleme: 3 gün
- Liste & detay şablonları: 4 gün
- CMS preview ve yayın akışı: 3 gün
- Arama ve etiketler: 3 gün
- RSS + SEO: 2 gün
- Dark mode & responsive polish: 2 gün
- Test & erişilebilirlik denetimi: 4 gün
- İçerik doldurma (10 yazı): 3 gün
- Buffer: 3 gün
- Toplam (MVP): 33 iş günü (~6–7 hafta)

## Kabul Kriterleri (Özet)
- Tüm MVP fonksiyonları çalışır ve testler/smoke testlerle doğrulanır.
- RSS doğru metadata ile sunulur.
- Lighthouse ölçümleri hedef aralığında.
- Tüm görsellerin lisans kayıtları bulunur.

## Kısa İçerik Örnekleri
- Home başlık: "Build, Share, and Discover Minecraft Creativity" (İsterseniz Türkçe uyarlama yapabilirim.)
- About kısa metin: "Bu blog, Minecraft estetiğinden ilham alan orijinal voxel sanatları ve derinlemesine rehberleri paylaşıyor. Erişilebilirlik ve performans önceliğimizdir."

---
*Bu PRD dosyası, proje yönlendirmesi ve ilk uygulama sprintleri için referans olarak kullanılacaktır.*
