# EasyFinder — Vendor Slug Audit (approval sheet)

Source: live Directus api.easyfinder.ae, status=published, 16,968 vendors, 10 Sep 2026

| Bucket | Count |
|---|---|
| A — Degenerate (slug null/empty/no letters) | 130 |
| B — Too short (1-2 chars) — KEEP | 7 |
| C — Duplicate-slug groups (205 groups / 293 losers) | 293 |
| Clean (single vendor, usable slug) | 16333 |

**Total vendors to 404 + remove from sitemap: 423** (records, reviews and data all stay in Directus; they keep working in /search and /vendors browse via ID)

---

## A) Degenerate slugs (130) — 404 + exit sitemap

| ID | Name | Stored slug | URL today |
|---|---|---|---|
| 4104 | ( ابرار) اوتو كفر لكهرباء ومكيفات السيارات | "ابرار-اوتو-كفر-لكهرباء-ومكيفات-السيارات" | https://www.easyfinder.ae/vendors/%D8%A7%D8%A8%D8%B1%D8%A7%D8%B1-%D8%A7%D9%88%D8%AA%D9%88-%D9%83%D9%81%D8%B1-%D9%84%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A1-%D9%88%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 6663 | -مدرسه المميز لتدريب القياده - عجمان (نوره ام محمد ) | "مدرسه-المميز-لتدريب-القياده-عجمان-نوره-ام-محمد" | https://www.easyfinder.ae/vendors/%D9%85%D8%AF%D8%B1%D8%B3%D9%87-%D8%A7%D9%84%D9%85%D9%85%D9%8A%D8%B2-%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8-%D8%A7%D9%84%D9%82%D9%8A%D8%A7%D8%AF%D9%87-%D8%B9%D8%AC%D9%85%D8%A7%D9%86-%D9%86%D9%88%D8%B1%D9%87-%D8%A7%D9%85-%D9%85%D8%AD%D9%85%D8%AF |
| 703 | :::. Abu Dhabi Locksmith .::: Call 24 hours | ":::.-abu-dhabi-locksmith-.:::-call-24-hours" | https://www.easyfinder.ae/vendors/%3A%3A%3A.-abu-dhabi-locksmith-.%3A%3A%3A-call-24-hours |
| 6841 | إشادة لأعمال الخدمات الفنية | "إشادة-لأعمال-الخدمات-الفنية" | https://www.easyfinder.ae/vendors/%D8%A5%D8%B4%D8%A7%D8%AF%D8%A9-%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%81%D9%86%D9%8A%D8%A9 |
| 6597 | ابوعمر ( محمد ) مدرب سواقة بالشارقة مجمع الناصرية مكتب ٢٥ | "ابوعمر-محمد-مدرب-سواقة-بالشارقة-مجمع-الناصرية-مكتب-٢٥" | https://www.easyfinder.ae/vendors/%D8%A7%D8%A8%D9%88%D8%B9%D9%85%D8%B1-%D9%85%D8%AD%D9%85%D8%AF-%D9%85%D8%AF%D8%B1%D8%A8-%D8%B3%D9%88%D8%A7%D9%82%D8%A9-%D8%A8%D8%A7%D9%84%D8%B4%D8%A7%D8%B1%D9%82%D8%A9-%D9%85%D8%AC%D9%85%D8%B9-%D8%A7%D9%84%D9%86%D8%A7%D8%B5%D8%B1%D9%8A%D8%A9-%D9%85%D9%83%D8%AA%D8%A8-%D9%A2%D9%A5 |
| 2814 | اركان المدينة لخدمات التنظيف بالساعه | "اركان-المدينة-لخدمات-التنظيف-بالساعه" | https://www.easyfinder.ae/vendors/%D8%A7%D8%B1%D9%83%D8%A7%D9%86-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%A8%D8%A7%D9%84%D8%B3%D8%A7%D8%B9%D9%87 |
| 4376 | الأبداع والتعمير لمقاولات البناء والصيانة العامة | "الأبداع-والتعمير-لمقاولات-البناء-والصيانة-العامة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A3%D8%A8%D8%AF%D8%A7%D8%B9-%D9%88%D8%A7%D9%84%D8%AA%D8%B9%D9%85%D9%8A%D8%B1-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D9%88%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9 |
| 4627 | الأراضي الملكية لتنسيق الحدائق في ابوظبي | "الأراضي-الملكية-لتنسيق-الحدائق-في-ابوظبي" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A3%D8%B1%D8%A7%D8%B6%D9%8A-%D8%A7%D9%84%D9%85%D9%84%D9%83%D9%8A%D8%A9-%D9%84%D8%AA%D9%86%D8%B3%D9%8A%D9%82-%D8%A7%D9%84%D8%AD%D8%AF%D8%A7%D8%A6%D9%82-%D9%81%D9%8A-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 6815 | الاتحاد لأعمال الرخام والجرانيت ذ.م.م | "الاتحاد-لأعمال-الرخام-والجرانيت-ذمم" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A7%D8%AA%D8%AD%D8%A7%D8%AF-%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D8%B1%D8%AE%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%AC%D8%B1%D8%A7%D9%86%D9%8A%D8%AA-%D8%B0%D9%85%D9%85 |
| 7168 | الاسكندرية العصرية لمقاولات البناء | "الاسكندرية-العصرية-لمقاولات-البناء" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A7%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D8%A9-%D8%A7%D9%84%D8%B9%D8%B5%D8%B1%D9%8A%D8%A9-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1 |
| 6842 | الانجاز الفني لمقاولات البناء | "الانجاز-الفني-لمقاولات-البناء" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A7%D9%86%D8%AC%D8%A7%D8%B2-%D8%A7%D9%84%D9%81%D9%86%D9%8A-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1 |
| 3021 | الاندلس لمكافة الحشرات والافات | "الاندلس-لمكافة-الحشرات-والافات" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A7%D9%86%D8%AF%D9%84%D8%B3-%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%A9-%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA-%D9%88%D8%A7%D9%84%D8%A7%D9%81%D8%A7%D8%AA |
| 4723 | البوادي لأحواض السباحة | "البوادي-لأحواض-السباحة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%A8%D9%88%D8%A7%D8%AF%D9%8A-%D9%84%D8%A3%D8%AD%D9%88%D8%A7%D8%B6-%D8%A7%D9%84%D8%B3%D8%A8%D8%A7%D8%AD%D8%A9 |
| 17245 | البيت الأنيق لخدمات التنظيف شركة الشخص الواحد ذ.م.م | "-------" | https://www.easyfinder.ae/vendors/------- |
| 6848 | الجزيرة العالمية لمقاولات البناء | "الجزيرة-العالمية-لمقاولات-البناء" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%AC%D8%B2%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%84%D9%85%D9%8A%D8%A9-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1 |
| 3641 | الخط الذهبي لأعمال زخرفة الجبس والدهانات الخاصة | "الخط-الذهبي-لأعمال-زخرفة-الجبس-والدهانات-الخاصة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%AE%D8%B7-%D8%A7%D9%84%D8%B0%D9%87%D8%A8%D9%8A-%D9%84%D8%A3%D8%B9%D9%85%D8%A7%D9%84-%D8%B2%D8%AE%D8%B1%D9%81%D8%A9-%D8%A7%D9%84%D8%AC%D8%A8%D8%B3-%D9%88%D8%A7%D9%84%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA-%D8%A7%D9%84%D8%AE%D8%A7%D8%B5%D8%A9 |
| 3235 | الخليج العربي للمفاتيح | "الخليج-العربي-للمفاتيح" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A-%D9%84%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD |
| 7122 | الدروب الخيرة للمقاولات العامة ذم م | "الدروب-الخيرة-للمقاولات-العامة-ذم-م" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%AF%D8%B1%D9%88%D8%A8-%D8%A7%D9%84%D8%AE%D9%8A%D8%B1%D8%A9-%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9-%D8%B0%D9%85-%D9%85 |
| 6833 | الشيماء للصيانة العامة | "الشيماء-للصيانة-العامة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%B4%D9%8A%D9%85%D8%A7%D8%A1-%D9%84%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9 |
| 3236 | الصحراء لنسخ المفاتيح | "الصحراء-لنسخ-المفاتيح" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%B5%D8%AD%D8%B1%D8%A7%D8%A1-%D9%84%D9%86%D8%B3%D8%AE-%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD |
| 2677 | الصقور لصيانة المكيفات | "الصقور-لصيانة-المكيفات" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D8%B5%D9%82%D9%88%D8%B1-%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA |
| 3115 | الفرح للإصلاح الاجهزة الكهربائية المنزلية | "الفرح-للإصلاح-الاجهزة-الكهربائية-المنزلية" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%81%D8%B1%D8%AD-%D9%84%D9%84%D8%A5%D8%B5%D9%84%D8%A7%D8%AD-%D8%A7%D9%84%D8%A7%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A6%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84%D9%8A%D8%A9 |
| 3009 | الفرسان لمكافحة الحشرات وتنظيف المباني | "الفرسان-لمكافحة-الحشرات-وتنظيف-المباني" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%81%D8%B1%D8%B3%D8%A7%D9%86-%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%AD%D8%A9-%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA-%D9%88%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A |
| 20156 | الفنك الذهبي لتنظيم الفعاليات | "---" | https://www.easyfinder.ae/vendors/--- |
| 4242 | القصر الملكي لتصنيع المطابخ والخزائن والديكور | "القصر-الملكي-لتصنيع-المطابخ-والخزائن-والديكور" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%82%D8%B5%D8%B1-%D8%A7%D9%84%D9%85%D9%84%D9%83%D9%8A-%D9%84%D8%AA%D8%B5%D9%86%D9%8A%D8%B9-%D8%A7%D9%84%D9%85%D8%B7%D8%A7%D8%A8%D8%AE-%D9%88%D8%A7%D9%84%D8%AE%D8%B2%D8%A7%D8%A6%D9%86-%D9%88%D8%A7%D9%84%D8%AF%D9%8A%D9%83%D9%88%D8%B1 |
| 5796 | القوة الأولي لخدمات التنظيف | "القوة-الأولي-لخدمات-التنظيف" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%82%D9%88%D8%A9-%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%8A-%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%81 |
| 2826 | اللؤلؤة الماسية للخدمات الفنية | "اللؤلؤة-الماسية-للخدمات-الفنية" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%84%D8%A4%D9%84%D8%A4%D8%A9-%D8%A7%D9%84%D9%85%D8%A7%D8%B3%D9%8A%D8%A9-%D9%84%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D9%81%D9%86%D9%8A%D8%A9 |
| 7111 | المبانى الذكيه الحديثه | "المبانى-الذكيه-الحديثه" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%89-%D8%A7%D9%84%D8%B0%D9%83%D9%8A%D9%87-%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB%D9%87 |
| 7177 | المبدأ لمقاولات البناء بالشارقة | "المبدأ-لمقاولات-البناء-بالشارقة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%85%D8%A8%D8%AF%D8%A3-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%A8%D8%A7%D9%84%D8%B4%D8%A7%D8%B1%D9%82%D8%A9 |
| 19063 | المتناول لخدمات التنظيف | "--" | https://www.easyfinder.ae/vendors/-- |
| 6828 | المجلس الفاخر للمقاولات و الصيانة العامة | "المجلس-الفاخر-للمقاولات-و-الصيانة-العامة" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%85%D8%AC%D9%84%D8%B3-%D8%A7%D9%84%D9%81%D8%A7%D8%AE%D8%B1-%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D9%88-%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9 |
| 19221 | المصدر المنير لتركيب أجهزة الطاقة الشمسية | "-----" | https://www.easyfinder.ae/vendors/----- |
| 3090 | المندوس لتصليح غسالات وثلاجات ومكيفات | "المندوس-لتصليح-غسالات-وثلاجات-ومكيفات" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%85%D9%86%D8%AF%D9%88%D8%B3-%D9%84%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D8%BA%D8%B3%D8%A7%D9%84%D8%A7%D8%AA-%D9%88%D8%AB%D9%84%D8%A7%D8%AC%D8%A7%D8%AA-%D9%88%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA |
| 3276 | المهند للأقفال والمفاتيح | "المهند-للأقفال-والمفاتيح" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%85%D9%87%D9%86%D8%AF-%D9%84%D9%84%D8%A3%D9%82%D9%81%D8%A7%D9%84-%D9%88%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD |
| 3177 | النجم الثاقب لتجارة المفاتيح والاقفال | "النجم-الثاقب-لتجارة-المفاتيح-والاقفال" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%86%D8%AC%D9%85-%D8%A7%D9%84%D8%AB%D8%A7%D9%82%D8%A8-%D9%84%D8%AA%D8%AC%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD-%D9%88%D8%A7%D9%84%D8%A7%D9%82%D9%81%D8%A7%D9%84 |
| 2844 | الورق الابيض لخدمات تنظيف المباني | "الورق-الابيض-لخدمات-تنظيف-المباني" | https://www.easyfinder.ae/vendors/%D8%A7%D9%84%D9%88%D8%B1%D9%82-%D8%A7%D9%84%D8%A7%D8%A8%D9%8A%D8%B6-%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A |
| 16828 | امير الجزيرة لاصلاح المكيفات | "---" | https://www.easyfinder.ae/vendors/--- |
| 2322 | برج الهدایا | "برج-الهدایا" | https://www.easyfinder.ae/vendors/%D8%A8%D8%B1%D8%AC-%D8%A7%D9%84%D9%87%D8%AF%D8%A7%DB%8C%D8%A7 |
| 23222 | تاج العمارة للمقاولات | "--" | https://www.easyfinder.ae/vendors/-- |
| 7096 | جينياس للمقاولات العامه والالمونيوم والزجاج | "جينياس-للمقاولات-العامه-والالمونيوم-والزجاج" | https://www.easyfinder.ae/vendors/%D8%AC%D9%8A%D9%86%D9%8A%D8%A7%D8%B3-%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D9%87-%D9%88%D8%A7%D9%84%D8%A7%D9%84%D9%85%D9%88%D9%86%D9%8A%D9%88%D9%85-%D9%88%D8%A7%D9%84%D8%B2%D8%AC%D8%A7%D8%AC |
| 23194 | جينياس للمقاولات العامه والالمونيوم والزجاج | "----" | https://www.easyfinder.ae/vendors/---- |
| 3038 | حديقة المدينة لمكافحة الحشرات وتنظيف المباني | "حديقة-المدينة-لمكافحة-الحشرات-وتنظيف-المباني" | https://www.easyfinder.ae/vendors/%D8%AD%D8%AF%D9%8A%D9%82%D8%A9-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9-%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%AD%D8%A9-%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA-%D9%88%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A |
| 19072 | خزان الراشدية | "-" | https://www.easyfinder.ae/vendors/- |
| 7164 | دار المتحدة للمقاولات البناء | "دار-المتحدة-للمقاولات-البناء" | https://www.easyfinder.ae/vendors/%D8%AF%D8%A7%D8%B1-%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D8%AF%D8%A9-%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1 |
| 6827 | داركو للمقاولات العامة | "داركو-للمقاولات-العامة" | https://www.easyfinder.ae/vendors/%D8%AF%D8%A7%D8%B1%D9%83%D9%88-%D9%84%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9 |
| 4807 | دروب للعناية بالسيارات | "دروب-للعناية-بالسيارات" | https://www.easyfinder.ae/vendors/%D8%AF%D8%B1%D9%88%D8%A8-%D9%84%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 6847 | دقة التنفيذ لمقاولات البناء ذ.م.م | "دقة-التنفيذ-لمقاولات-البناء-ذمم" | https://www.easyfinder.ae/vendors/%D8%AF%D9%82%D8%A9-%D8%A7%D9%84%D8%AA%D9%86%D9%81%D9%8A%D8%B0-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%B0%D9%85%D9%85 |
| 7103 | ديكورات واصباغ البيت الجميل +ترميم منازل+صيانة مباني | "ديكورات-واصباغ-البيت-الجميل-ترميم-منازلصيانة-مباني" | https://www.easyfinder.ae/vendors/%D8%AF%D9%8A%D9%83%D9%88%D8%B1%D8%A7%D8%AA-%D9%88%D8%A7%D8%B5%D8%A8%D8%A7%D8%BA-%D8%A7%D9%84%D8%A8%D9%8A%D8%AA-%D8%A7%D9%84%D8%AC%D9%85%D9%8A%D9%84-%D8%AA%D8%B1%D9%85%D9%8A%D9%85-%D9%85%D9%86%D8%A7%D8%B2%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D9%85%D8%A8%D8%A7%D9%86%D9%8A |
| 7174 | ركن الاوركيد لمقاولات البناء ذ.م.م | "ركن-الاوركيد-لمقاولات-البناء-ذمم" | https://www.easyfinder.ae/vendors/%D8%B1%D9%83%D9%86-%D8%A7%D9%84%D8%A7%D9%88%D8%B1%D9%83%D9%8A%D8%AF-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%B0%D9%85%D9%85 |
| 3766 | رواد الحماية سمارت هوم البيوت الذكية | "رواد-الحماية-سمارت-هوم-البيوت-الذكية" | https://www.easyfinder.ae/vendors/%D8%B1%D9%88%D8%A7%D8%AF-%D8%A7%D9%84%D8%AD%D9%85%D8%A7%D9%8A%D8%A9-%D8%B3%D9%85%D8%A7%D8%B1%D8%AA-%D9%87%D9%88%D9%85-%D8%A7%D9%84%D8%A8%D9%8A%D9%88%D8%AA-%D8%A7%D9%84%D8%B0%D9%83%D9%8A%D8%A9 |
| 1275 | سباك في ابوظبي | "سباك-في-ابوظبي" | https://www.easyfinder.ae/vendors/%D8%B3%D8%A8%D8%A7%D9%83-%D9%81%D9%8A-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 4383 | سلطان الشحي لمقاولات البناء والصيانة العامة | "سلطان-الشحي-لمقاولات-البناء-والصيانة-العامة" | https://www.easyfinder.ae/vendors/%D8%B3%D9%84%D8%B7%D8%A7%D9%86-%D8%A7%D9%84%D8%B4%D8%AD%D9%8A-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D9%88%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9 |
| 4006 | سويت كار لاصلاح مكيفات وكهرباء السيارات | "سويت-كار-لاصلاح-مكيفات-وكهرباء-السيارات" | https://www.easyfinder.ae/vendors/%D8%B3%D9%88%D9%8A%D8%AA-%D9%83%D8%A7%D8%B1-%D9%84%D8%A7%D8%B5%D9%84%D8%A7%D8%AD-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D9%88%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A1-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 23478 | شركة أوربيتكس للمصاعد والسلالم الكهربائية | "----" | https://www.easyfinder.ae/vendors/---- |
| 5817 | شركة البيان الكافي لمكافحة الحشرات وخدمات التنظيف | "شركة-البيان-الكافي-لمكافحة-الحشرات-وخدمات-التنظيف" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D8%A8%D9%8A%D8%A7%D9%86-%D8%A7%D9%84%D9%83%D8%A7%D9%81%D9%8A-%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%AD%D8%A9-%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA-%D9%88%D8%AE%D8%AF%D9%85%D8%A7%D8%AA-%D8%A7%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%81 |
| 19107 | شركة البيان الكافي لمكافحة الحشرات وخدمات التنظيف | "------" | https://www.easyfinder.ae/vendors/------ |
| 15082 | شركة التوازن نقل الاثاث دبي | "----" | https://www.easyfinder.ae/vendors/---- |
| 7663 | شركة الحمد لنقل الأثاث | "شركة-الحمد-لنقل-الأثاث" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D8%AD%D9%85%D8%AF-%D9%84%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%A3%D8%AB%D8%A7%D8%AB |
| 7141 | شركة الخليج للمصاعد ذ.م.م فرع دبي | "شركة-الخليج-للمصاعد-ذمم-فرع-دبي" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC-%D9%84%D9%84%D9%85%D8%B5%D8%A7%D8%B9%D8%AF-%D8%B0%D9%85%D9%85-%D9%81%D8%B1%D8%B9-%D8%AF%D8%A8%D9%8A |
| 15546 | شركة الدرر لتأجير السيارات | "---" | https://www.easyfinder.ae/vendors/--- |
| 7171 | شركة الرحاب للزجاج والالمنيوم | "شركة-الرحاب-للزجاج-والالمنيوم" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D8%B1%D8%AD%D8%A7%D8%A8-%D9%84%D9%84%D8%B2%D8%AC%D8%A7%D8%AC-%D9%88%D8%A7%D9%84%D8%A7%D9%84%D9%85%D9%86%D9%8A%D9%88%D9%85 |
| 3132 | شركة الشريم نقل اثاث عجمان | "شركة-الشريم-نقل-اثاث-عجمان" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D8%B4%D8%B1%D9%8A%D9%85-%D9%86%D9%82%D9%84-%D8%A7%D8%AB%D8%A7%D8%AB-%D8%B9%D8%AC%D9%85%D8%A7%D9%86 |
| 5803 | شركة الفلتر النقي | "شركة-الفلتر-النقي" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D9%81%D9%84%D8%AA%D8%B1-%D8%A7%D9%84%D9%86%D9%82%D9%8A |
| 7665 | شركة الكمر نقل الاثاث ابوظبي | "شركة-الكمر-نقل-الاثاث-ابوظبي" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D9%83%D9%85%D8%B1-%D9%86%D9%82%D9%84-%D8%A7%D9%84%D8%A7%D8%AB%D8%A7%D8%AB-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 6849 | شركة الوعود للتنظيف والصيانة | "شركة-الوعود-للتنظيف-والصيانة" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A7%D9%84%D9%88%D8%B9%D9%88%D8%AF-%D9%84%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D9%88%D8%A7%D9%84%D8%B5%D9%8A%D8%A7%D9%86%D8%A9 |
| 17997 | شركة اليزا نقل اثاث دبي | "----" | https://www.easyfinder.ae/vendors/---- |
| 3015 | شركة بيرالاندمكافحةالحشرات | "شركة-بيرالاندمكافحةالحشرات" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%A8%D9%8A%D8%B1%D8%A7%D9%84%D8%A7%D9%86%D8%AF%D9%85%D9%83%D8%A7%D9%81%D8%AD%D8%A9%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA |
| 14292 | شركة ترانسفيرس نقل الأثاث ذ.م.م | "----" | https://www.easyfinder.ae/vendors/---- |
| 14350 | شركة تركيب طارد حمام في دبي تركيب سلك طارد للطيور مكافحة الحمام | "-----------" | https://www.easyfinder.ae/vendors/----------- |
| 5811 | شركة تنظيف خزانات مياه \| سلطان للتنظيف | "شركة-تنظيف-خزانات-مياه-سلطان-للتنظيف" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%AE%D8%B2%D8%A7%D9%86%D8%A7%D8%AA-%D9%85%D9%8A%D8%A7%D9%87-%D8%B3%D9%84%D8%B7%D8%A7%D9%86-%D9%84%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%81 |
| 2780 | شركة تنظيف فلل في ابوظبي الفؤاد كلين | "شركة-تنظيف-فلل-في-ابوظبي-الفؤاد-كلين" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D9%81%D9%84%D9%84-%D9%81%D9%8A-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A-%D8%A7%D9%84%D9%81%D8%A4%D8%A7%D8%AF-%D9%83%D9%84%D9%8A%D9%86 |
| 17477 | شركة مكافحة صراصير مكافحة الرمة مكافحة الحشرات مكافحة الحمام | "--------" | https://www.easyfinder.ae/vendors/-------- |
| 7470 | شركه الخليج للمصاعد ذ.م.م فرع ابوظبي | "شركه-الخليج-للمصاعد-ذمم-فرع-ابوظبي" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%D9%83%D9%87-%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC-%D9%84%D9%84%D9%85%D8%B5%D8%A7%D8%B9%D8%AF-%D8%B0%D9%85%D9%85-%D9%81%D8%B1%D8%B9-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 16115 | شركه تنظيف منازل في دبي تنظيف سجاد تنظيف كنب تنظيف فلل تنظيف خزانات تنظيف مجالس شركه جلي وتلميع الرخام الرخام في دبي الامل | "----------------------" | https://www.easyfinder.ae/vendors/---------------------- |
| 3136 | شرکة انس نقل اثاث عجمان | "شرکة-انس-نقل-اثاث-عجمان" | https://www.easyfinder.ae/vendors/%D8%B4%D8%B1%DA%A9%D8%A9-%D8%A7%D9%86%D8%B3-%D9%86%D9%82%D9%84-%D8%A7%D8%AB%D8%A7%D8%AB-%D8%B9%D8%AC%D9%85%D8%A7%D9%86 |
| 18527 | شمس الياسمين لمقاولات البناء | "---" | https://www.easyfinder.ae/vendors/--- |
| 5493 | صالون سكرة للتجميل | "صالون-سكرة-للتجميل" | https://www.easyfinder.ae/vendors/%D8%B5%D8%A7%D9%84%D9%88%D9%86-%D8%B3%D9%83%D8%B1%D8%A9-%D9%84%D9%84%D8%AA%D8%AC%D9%85%D9%8A%D9%84 |
| 3256 | صيانة كيرو | "صيانة-كيرو" | https://www.easyfinder.ae/vendors/%D8%B5%D9%8A%D8%A7%D9%86%D8%A9-%D9%83%D9%8A%D8%B1%D9%88 |
| 22849 | عبقرية تكنولوجيا المعلومات واستشارات الذكاء الإصطناعي | "-----" | https://www.easyfinder.ae/vendors/----- |
| 15227 | عش العروس | "-" | https://www.easyfinder.ae/vendors/- |
| 4132 | عمران انجم تسلیحہ مقیفات سیارات | "عمران-انجم-تسلیحہ-مقیفات-سیارات" | https://www.easyfinder.ae/vendors/%D8%B9%D9%85%D8%B1%D8%A7%D9%86-%D8%A7%D9%86%D8%AC%D9%85-%D8%AA%D8%B3%D9%84%DB%8C%D8%AD%DB%81-%D9%85%D9%82%DB%8C%D9%81%D8%A7%D8%AA-%D8%B3%DB%8C%D8%A7%D8%B1%D8%A7%D8%AA |
| 16159 | غسيل | null | (no URL — slug null) |
| 3259 | فتح السيارات فتح سيارة فتح الباب فتح أبوابه فتح سيارات | "فتح-السيارات-فتح-سيارة-فتح-الباب-فتح-أبوابه-فتح-سيارات" | https://www.easyfinder.ae/vendors/%D9%81%D8%AA%D8%AD-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D9%81%D8%AA%D8%AD-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A9-%D9%81%D8%AA%D8%AD-%D8%A7%D9%84%D8%A8%D8%A7%D8%A8-%D9%81%D8%AA%D8%AD-%D8%A3%D8%A8%D9%88%D8%A7%D8%A8%D9%87-%D9%81%D8%AA%D8%AD-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 3017 | قطرات لمكافحه الحشرات وتنظيف المباني (فرع عجمان ) | "قطرات-لمكافحه-الحشرات-وتنظيف-المباني-فرع-عجمان" | https://www.easyfinder.ae/vendors/%D9%82%D8%B7%D8%B1%D8%A7%D8%AA-%D9%84%D9%85%D9%83%D8%A7%D9%81%D8%AD%D9%87-%D8%A7%D9%84%D8%AD%D8%B4%D8%B1%D8%A7%D8%AA-%D9%88%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%A7%D9%84%D9%85%D8%A8%D8%A7%D9%86%D9%8A-%D9%81%D8%B1%D8%B9-%D8%B9%D8%AC%D9%85%D8%A7%D9%86 |
| 17831 | قمة ميسلون للمقاولات ذ.م.م | "---" | https://www.easyfinder.ae/vendors/--- |
| 4032 | كراج الرؤيه لتصليح السيارات كهرباء تكييف مكانيك | "كراج-الرؤيه-لتصليح-السيارات-كهرباء-تكييف-مكانيك" | https://www.easyfinder.ae/vendors/%D9%83%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D8%B1%D8%A4%D9%8A%D9%87-%D9%84%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A1-%D8%AA%D9%83%D9%8A%D9%8A%D9%81-%D9%85%D9%83%D8%A7%D9%86%D9%8A%D9%83 |
| 4119 | كراج الليوان لتصليح مكيفات السيارات | "كراج-الليوان-لتصليح-مكيفات-السيارات" | https://www.easyfinder.ae/vendors/%D9%83%D8%B1%D8%A7%D8%AC-%D8%A7%D9%84%D9%84%D9%8A%D9%88%D8%A7%D9%86-%D9%84%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D9%85%D9%83%D9%8A%D9%81%D8%A7%D8%AA-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 19902 | كراج متنقل ابوظبي - تصليح سيارات ابوظبي | "-------" | https://www.easyfinder.ae/vendors/------- |
| 1315 | كهربائي في دبي | "كهربائي-في-دبي" | https://www.easyfinder.ae/vendors/%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A6%D9%8A-%D9%81%D9%8A-%D8%AF%D8%A8%D9%8A |
| 17937 | لا ميركانتي للأثاث المكتبي الإيطالي: مكتب إداري تنفيذي مصنوع في إيطاليا | "----------" | https://www.easyfinder.ae/vendors/---------- |
| 3246 | للحداد خدمة متنقلة فتح سيارات نسخ مفاتيح | "للحداد-خدمة-متنقلة-فتح-سيارات-نسخ-مفاتيح" | https://www.easyfinder.ae/vendors/%D9%84%D9%84%D8%AD%D8%AF%D8%A7%D8%AF-%D8%AE%D8%AF%D9%85%D8%A9-%D9%85%D8%AA%D9%86%D9%82%D9%84%D8%A9-%D9%81%D8%AA%D8%AD-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D9%86%D8%B3%D8%AE-%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD |
| 6832 | مؤسسة العرياني للنقل و المقاولات | "مؤسسة-العرياني-للنقل-و-المقاولات" | https://www.easyfinder.ae/vendors/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D8%A7%D9%84%D8%B9%D8%B1%D9%8A%D8%A7%D9%86%D9%8A-%D9%84%D9%84%D9%86%D9%82%D9%84-%D9%88-%D8%A7%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA |
| 5058 | مؤسسة تسليك مجاري وتنظيف خطوط الصرف دبي | "مؤسسة-تسليك-مجاري-وتنظيف-خطوط-الصرف-دبي" | https://www.easyfinder.ae/vendors/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D8%AA%D8%B3%D9%84%D9%8A%D9%83-%D9%85%D8%AC%D8%A7%D8%B1%D9%8A-%D9%88%D8%AA%D9%86%D8%B8%D9%8A%D9%81-%D8%AE%D8%B7%D9%88%D8%B7-%D8%A7%D9%84%D8%B5%D8%B1%D9%81-%D8%AF%D8%A8%D9%8A |
| 7124 | مؤسسة علاء لاعمال النجاره والحدادة المسلحة مع توريد المواد ابوظبي | "مؤسسة-علاء-لاعمال-النجاره-والحدادة-المسلحة-مع-توريد-المواد-ابوظبي" | https://www.easyfinder.ae/vendors/%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D8%B9%D9%84%D8%A7%D8%A1-%D9%84%D8%A7%D8%B9%D9%85%D8%A7%D9%84-%D8%A7%D9%84%D9%86%D8%AC%D8%A7%D8%B1%D9%87-%D9%88%D8%A7%D9%84%D8%AD%D8%AF%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D9%85%D8%B3%D9%84%D8%AD%D8%A9-%D9%85%D8%B9-%D8%AA%D9%88%D8%B1%D9%8A%D8%AF-%D8%A7%D9%84%D9%85%D9%88%D8%A7%D8%AF-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 23225 | مؤسسه إشراقه | "-" | https://www.easyfinder.ae/vendors/- |
| 7102 | ماربل هاوس للانشاء و التعمير | "ماربل-هاوس-للانشاء-و-التعمير" | https://www.easyfinder.ae/vendors/%D9%85%D8%A7%D8%B1%D8%A8%D9%84-%D9%87%D8%A7%D9%88%D8%B3-%D9%84%D9%84%D8%A7%D9%86%D8%B4%D8%A7%D8%A1-%D9%88-%D8%A7%D9%84%D8%AA%D8%B9%D9%85%D9%8A%D8%B1 |
| 15019 | مالترانس جبل علي | "--" | https://www.easyfinder.ae/vendors/-- |
| 3279 | محروس | "محروس" | https://www.easyfinder.ae/vendors/%D9%85%D8%AD%D8%B1%D9%88%D8%B3 |
| 1285 | محمد اقبال لاصلاح التمديدات و التركيبات الصحية ذ.م.م | "محمد-اقبال-لاصلاح-التمديدات-و-التركيبات-الصحية-ذمم" | https://www.easyfinder.ae/vendors/%D9%85%D8%AD%D9%85%D8%AF-%D8%A7%D9%82%D8%A8%D8%A7%D9%84-%D9%84%D8%A7%D8%B5%D9%84%D8%A7%D8%AD-%D8%A7%D9%84%D8%AA%D9%85%D8%AF%D9%8A%D8%AF%D8%A7%D8%AA-%D9%88-%D8%A7%D9%84%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%D8%A7%D8%AA-%D8%A7%D9%84%D8%B5%D8%AD%D9%8A%D8%A9-%D8%B0%D9%85%D9%85 |
| 16391 | محمد عبدالله شمسي | "--" | https://www.easyfinder.ae/vendors/-- |
| 21055 | مخبز الجديد | "-" | https://www.easyfinder.ae/vendors/- |
| 6610 | مدرب محمد عثمان تعليم قيادة سيارات في الشارقة الناصرية مدرسة لتعليم قيادة السيارات واستخراج رخص | "مدرب-محمد-عثمان-تعليم-قيادة-سيارات-في-الشارقة-الناصرية-مدرسة-لتعليم-قيادة-السيارات-واستخراج-رخص" | https://www.easyfinder.ae/vendors/%D9%85%D8%AF%D8%B1%D8%A8-%D9%85%D8%AD%D9%85%D8%AF-%D8%B9%D8%AB%D9%85%D8%A7%D9%86-%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D9%82%D9%8A%D8%A7%D8%AF%D8%A9-%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D9%81%D9%8A-%D8%A7%D9%84%D8%B4%D8%A7%D8%B1%D9%82%D8%A9-%D8%A7%D9%84%D9%86%D8%A7%D8%B5%D8%B1%D9%8A%D8%A9-%D9%85%D8%AF%D8%B1%D8%B3%D8%A9-%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85-%D9%82%D9%8A%D8%A7%D8%AF%D8%A9-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA-%D9%88%D8%A7%D8%B3%D8%AA%D8%AE%D8%B1%D8%A7%D8%AC-%D8%B1%D8%AE%D8%B5 |
| 6630 | مدربة سواقة ام مازن | "مدربة-سواقة-ام-مازن" | https://www.easyfinder.ae/vendors/%D9%85%D8%AF%D8%B1%D8%A8%D8%A9-%D8%B3%D9%88%D8%A7%D9%82%D8%A9-%D8%A7%D9%85-%D9%85%D8%A7%D8%B2%D9%86 |
| 22468 | مدرسة العقيد لتعليم قيادة السيارات | "----" | https://www.easyfinder.ae/vendors/---- |
| 7455 | مصاعد سمو | "مصاعد-سمو" | https://www.easyfinder.ae/vendors/%D9%85%D8%B5%D8%A7%D8%B9%D8%AF-%D8%B3%D9%85%D9%88 |
| 6836 | معمار لمقاولات البناء ش .ذ.م.م | "معمار-لمقاولات-البناء-ش-ذمم" | https://www.easyfinder.ae/vendors/%D9%85%D8%B9%D9%85%D8%A7%D8%B1-%D9%84%D9%85%D9%82%D8%A7%D9%88%D9%84%D8%A7%D8%AA-%D8%A7%D9%84%D8%A8%D9%86%D8%A7%D8%A1-%D8%B4-%D8%B0%D9%85%D9%85 |
| 7094 | مقاول نجاره وحداده مسلح تسليم هيكل عظمي | "مقاول-نجاره-وحداده-مسلح-تسليم-هيكل-عظمي" | https://www.easyfinder.ae/vendors/%D9%85%D9%82%D8%A7%D9%88%D9%84-%D9%86%D8%AC%D8%A7%D8%B1%D9%87-%D9%88%D8%AD%D8%AF%D8%A7%D8%AF%D9%87-%D9%85%D8%B3%D9%84%D8%AD-%D8%AA%D8%B3%D9%84%D9%8A%D9%85-%D9%87%D9%8A%D9%83%D9%84-%D8%B9%D8%B8%D9%85%D9%8A |
| 15377 | منجرة السلمان | "-" | https://www.easyfinder.ae/vendors/- |
| 1807 | نجار في ابوظبي | "نجار-في-ابوظبي" | https://www.easyfinder.ae/vendors/%D9%86%D8%AC%D8%A7%D8%B1-%D9%81%D9%8A-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 7541 | نجمة الراشدية نقل اثاث دبي ذ.م.م | "نجمة-الراشدية-نقل-اثاث-دبي-ذمم" | https://www.easyfinder.ae/vendors/%D9%86%D8%AC%D9%85%D8%A9-%D8%A7%D9%84%D8%B1%D8%A7%D8%B4%D8%AF%D9%8A%D8%A9-%D9%86%D9%82%D9%84-%D8%A7%D8%AB%D8%A7%D8%AB-%D8%AF%D8%A8%D9%8A-%D8%B0%D9%85%D9%85 |
| 3242 | نسخ المفاتيح وتصليح الاقفال الجزيرة | "نسخ-المفاتيح-وتصليح-الاقفال-الجزيرة" | https://www.easyfinder.ae/vendors/%D9%86%D8%B3%D8%AE-%D8%A7%D9%84%D9%85%D9%81%D8%A7%D8%AA%D9%8A%D8%AD-%D9%88%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D8%A7%D9%84%D8%A7%D9%82%D9%81%D8%A7%D9%84-%D8%A7%D9%84%D8%AC%D8%B2%D9%8A%D8%B1%D8%A9 |
| 4222 | نقل أثاث أبوظبي | "نقل-أثاث-أبوظبي" | https://www.easyfinder.ae/vendors/%D9%86%D9%82%D9%84-%D8%A3%D8%AB%D8%A7%D8%AB-%D8%A3%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 1666 | هايبر نقل اثاث وتغليف ابوظبي | "هايبر-نقل-اثاث-وتغليف-ابوظبي" | https://www.easyfinder.ae/vendors/%D9%87%D8%A7%D9%8A%D8%A8%D8%B1-%D9%86%D9%82%D9%84-%D8%A7%D8%AB%D8%A7%D8%AB-%D9%88%D8%AA%D8%BA%D9%84%D9%8A%D9%81-%D8%A7%D8%A8%D9%88%D8%B8%D8%A8%D9%8A |
| 15098 | هلال الشمس لنقل الاثاث | "---" | https://www.easyfinder.ae/vendors/--- |
| 2098 | ورشه ملك برادرز لتصليح السيارات | "ورشه-ملك-برادرز-لتصليح-السيارات" | https://www.easyfinder.ae/vendors/%D9%88%D8%B1%D8%B4%D9%87-%D9%85%D9%84%D9%83-%D8%A8%D8%B1%D8%A7%D8%AF%D8%B1%D8%B2-%D9%84%D8%AA%D8%B5%D9%84%D9%8A%D8%AD-%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA |
| 16275 | 众信汽车服务中心 | null | (no URL — slug null) |
| 3888 | 𝐃𝐢𝐚𝐥𝐚𝐭𝐢𝐫𝐞.𝐜𝐨𝐦 - 𝐓𝐡𝐞 𝐌𝐨𝐬𝐭 𝐓𝐫𝐮𝐬𝐭𝐞𝐝 𝐓𝐲𝐫𝐞 𝐒𝐞𝐫𝐯𝐢𝐜𝐞 𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐫 𝐢𝐧 𝐭𝐡𝐞 𝐔𝐀𝐄 | "𝐃𝐢𝐚𝐥𝐚𝐭𝐢𝐫𝐞𝐜𝐨𝐦-𝐓𝐡𝐞-𝐌𝐨𝐬𝐭-𝐓𝐫𝐮𝐬𝐭𝐞𝐝-𝐓𝐲𝐫𝐞-𝐒𝐞𝐫𝐯𝐢𝐜𝐞-𝐏𝐫𝐨𝐯𝐢𝐝𝐞𝐫-𝐢𝐧-𝐭𝐡𝐞-𝐔𝐀𝐄" | https://www.easyfinder.ae/vendors/%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%9A%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%A6-%F0%9D%90%93%F0%9D%90%A1%F0%9D%90%9E-%F0%9D%90%8C%F0%9D%90%A8%F0%9D%90%AC%F0%9D%90%AD-%F0%9D%90%93%F0%9D%90%AB%F0%9D%90%AE%F0%9D%90%AC%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%9D-%F0%9D%90%93%F0%9D%90%B2%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%92%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%AF%F0%9D%90%A2%F0%9D%90%9C%F0%9D%90%9E-%F0%9D%90%8F%F0%9D%90%AB%F0%9D%90%A8%F0%9D%90%AF%F0%9D%90%A2%F0%9D%90%9D%F0%9D%90%9E%F0%9D%90%AB-%F0%9D%90%A2%F0%9D%90%A7-%F0%9D%90%AD%F0%9D%90%A1%F0%9D%90%9E-%F0%9D%90%94%F0%9D%90%80%F0%9D%90%84 |
| 1790 | 𝐃𝐢𝐠𝐢𝐜𝐫𝐚𝐟𝐭 𝐈𝐧𝐭𝐞𝐫𝐢𝐨𝐫 𝐃𝐞𝐬𝐢𝐠𝐧 | "𝐃𝐢𝐠𝐢𝐜𝐫𝐚𝐟𝐭-𝐈𝐧𝐭𝐞𝐫𝐢𝐨𝐫-𝐃𝐞𝐬𝐢𝐠𝐧" | https://www.easyfinder.ae/vendors/%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%A0%F0%9D%90%A2%F0%9D%90%9C%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%9F%F0%9D%90%AD-%F0%9D%90%88%F0%9D%90%A7%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%A2%F0%9D%90%A8%F0%9D%90%AB-%F0%9D%90%83%F0%9D%90%9E%F0%9D%90%AC%F0%9D%90%A2%F0%9D%90%A0%F0%9D%90%A7 |
| 3233 | 𝐊𝐈𝐍𝐆 𝐒𝐓𝐀𝐑 𝐊𝐄𝐘 𝐂𝐔𝐓𝐓𝐈𝐍𝐆 𝐋.𝐋.𝐂 | "𝐊𝐈𝐍𝐆-𝐒𝐓𝐀𝐑-𝐊𝐄𝐘-𝐂𝐔𝐓𝐓𝐈𝐍𝐆-𝐋𝐋𝐂" | https://www.easyfinder.ae/vendors/%F0%9D%90%8A%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%86-%F0%9D%90%92%F0%9D%90%93%F0%9D%90%80%F0%9D%90%91-%F0%9D%90%8A%F0%9D%90%84%F0%9D%90%98-%F0%9D%90%82%F0%9D%90%94%F0%9D%90%93%F0%9D%90%93%F0%9D%90%88%F0%9D%90%8D%F0%9D%90%86-%F0%9D%90%8B%F0%9D%90%8B%F0%9D%90%82 |
| 2077 | 𝐌𝐚𝐠𝐢𝐜 𝐓𝐨𝐮𝐜𝐡 𝐀𝐮𝐭𝐨 𝐆𝐚𝐫𝐚𝐠𝐞 | "𝐌𝐚𝐠𝐢𝐜-𝐓𝐨𝐮𝐜𝐡-𝐀𝐮𝐭𝐨-𝐆𝐚𝐫𝐚𝐠𝐞" | https://www.easyfinder.ae/vendors/%F0%9D%90%8C%F0%9D%90%9A%F0%9D%90%A0%F0%9D%90%A2%F0%9D%90%9C-%F0%9D%90%93%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%9C%F0%9D%90%A1-%F0%9D%90%80%F0%9D%90%AE%F0%9D%90%AD%F0%9D%90%A8-%F0%9D%90%86%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%A0%F0%9D%90%9E |
| 3792 | 𝐒𝐚𝐟𝐚 𝐋𝐮𝐱 𝐀𝐮𝐭𝐨 𝐂𝐚𝐫𝐞 - 𝐂𝐀𝐑 𝐖𝐚𝐬𝐡, 𝐂𝐚𝐫 𝐃𝐞𝐭𝐚𝐢𝐥𝐢𝐧𝐠, 𝐂𝐞𝐫𝐚𝐦𝐢𝐜 𝐜𝐨𝐚𝐭𝐢𝐧𝐠, 𝐂𝐀𝐑𝐒 𝐂𝐀𝐑𝐄 𝐖𝐈𝐓𝐇 𝐋𝐎𝐕𝐄 | "𝐒𝐚𝐟𝐚-𝐋𝐮𝐱-𝐀𝐮𝐭𝐨-𝐂𝐚𝐫𝐞-𝐂𝐀𝐑-𝐖𝐚𝐬𝐡-𝐂𝐚𝐫-𝐃𝐞𝐭𝐚𝐢𝐥𝐢𝐧𝐠-𝐂𝐞𝐫𝐚𝐦𝐢𝐜-𝐜𝐨𝐚𝐭𝐢𝐧𝐠-𝐂𝐀𝐑𝐒-𝐂𝐀𝐑𝐄-𝐖𝐈𝐓𝐇-𝐋𝐎𝐕𝐄" | https://www.easyfinder.ae/vendors/%F0%9D%90%92%F0%9D%90%9A%F0%9D%90%9F%F0%9D%90%9A-%F0%9D%90%8B%F0%9D%90%AE%F0%9D%90%B1-%F0%9D%90%80%F0%9D%90%AE%F0%9D%90%AD%F0%9D%90%A8-%F0%9D%90%82%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%82%F0%9D%90%80%F0%9D%90%91-%F0%9D%90%96%F0%9D%90%9A%F0%9D%90%AC%F0%9D%90%A1-%F0%9D%90%82%F0%9D%90%9A%F0%9D%90%AB-%F0%9D%90%83%F0%9D%90%9E%F0%9D%90%AD%F0%9D%90%9A%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%82%F0%9D%90%9E%F0%9D%90%AB%F0%9D%90%9A%F0%9D%90%A6%F0%9D%90%A2%F0%9D%90%9C-%F0%9D%90%9C%F0%9D%90%A8%F0%9D%90%9A%F0%9D%90%AD%F0%9D%90%A2%F0%9D%90%A7%F0%9D%90%A0-%F0%9D%90%82%F0%9D%90%80%F0%9D%90%91%F0%9D%90%92-%F0%9D%90%82%F0%9D%90%80%F0%9D%90%91%F0%9D%90%84-%F0%9D%90%96%F0%9D%90%88%F0%9D%90%93%F0%9D%90%87-%F0%9D%90%8B%F0%9D%90%8E%F0%9D%90%95%F0%9D%90%84 |
| 15735 | 𝐒𝐮𝐧 𝐒𝐨𝐮𝐤 𝐂𝐚𝐫 𝐑𝐞𝐧𝐭𝐚𝐥 \| 𝐃𝐮𝐛𝐚𝐢 𝐂𝐚𝐫 𝐫𝐞𝐧𝐭𝐚𝐥𝐬 | "-------" | https://www.easyfinder.ae/vendors/------- |
| 22781 | 𝐒𝐲𝐬𝐭𝐞𝐦 𝐄𝐱𝐩𝐞𝐫𝐭 𝐈𝐓 𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬 \| 𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐌𝐚𝐫𝐤𝐞𝐭𝐢𝐧𝐠 𝐬𝐞𝐫𝐯𝐢𝐜𝐞𝐬 \| 𝐄𝐧𝐝-𝐭𝐨-𝐄𝐧𝐝 𝐈𝐓 𝐒𝐞𝐫𝐯𝐢𝐜𝐞𝐬 &𝐓𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲 𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬 | "---------------" | https://www.easyfinder.ae/vendors/--------------- |
| 20123 | 𝐓𝐖𝐓 𝐀𝐮𝐭𝐨 𝐂𝐚𝐫𝐞 - 𝐂𝐚𝐫 𝐔𝐩𝐡𝐨𝐥𝐬𝐭𝐞𝐫𝐲 𝐚𝐧𝐝 𝐂𝐚𝐫 𝐀𝐜𝐜𝐞𝐬𝐬𝐨𝐫𝐢𝐞𝐬 𝐀𝐥 𝐐𝐮𝐨𝐳 𝐃𝐮𝐛𝐚𝐢 | "------------" | https://www.easyfinder.ae/vendors/------------ |
| 15779 | 𝐓𝐡𝐞 𝐂𝐚𝐫 𝐋𝐚𝐛 𝐀𝐮𝐭𝐨 𝐑𝐞𝐩𝐚𝐢𝐫 𝐂𝐞𝐧𝐭𝐞𝐫 | "-----" | https://www.easyfinder.ae/vendors/----- |
| 22007 | 𝑬𝒂𝒔𝒚 𝑪𝒖𝒕 𝑮𝒆𝒏𝒕𝒔 𝑺𝒂𝒍𝒐𝒏 (صالون ايزي كت) | "------" | https://www.easyfinder.ae/vendors/------ |
| 19949 | 𝗘𝘂𝗿𝗼 𝗦𝗽𝗼𝘁 𝗔𝘂𝘁𝗼 𝗿𝗲𝗽𝗮𝗶𝗿𝗶𝗻𝗴 \| 𝗔𝗗𝗔𝗦 𝗰𝗮𝗹𝗶𝗯𝗿𝗮𝘁𝗶𝗼𝗻 \| 𝗔𝘂𝘁𝗼 𝗽𝗿𝗼𝗴𝗿𝗮𝗺𝗶𝗻𝗴 𝗰𝗲𝗻𝘁𝗲𝗿 | "----------" | https://www.easyfinder.ae/vendors/---------- |
| 2083 | 𝗦𝗔𝗘𝗘𝗗 𝗔𝗟 𝗭𝗔𝗔𝗕𝗜 𝗔𝗨𝗧𝗢𝗖𝗔𝗥𝗘 𝗖𝗘𝗡𝗧𝗘𝗥 𝗟.𝗟.𝗖 | "𝗦𝗔𝗘𝗘𝗗-𝗔𝗟-𝗭𝗔𝗔𝗕𝗜-𝗔𝗨𝗧𝗢𝗖𝗔𝗥𝗘-𝗖𝗘𝗡𝗧𝗘𝗥-𝗟𝗟𝗖" | https://www.easyfinder.ae/vendors/%F0%9D%97%A6%F0%9D%97%94%F0%9D%97%98%F0%9D%97%98%F0%9D%97%97-%F0%9D%97%94%F0%9D%97%9F-%F0%9D%97%AD%F0%9D%97%94%F0%9D%97%94%F0%9D%97%95%F0%9D%97%9C-%F0%9D%97%94%F0%9D%97%A8%F0%9D%97%A7%F0%9D%97%A2%F0%9D%97%96%F0%9D%97%94%F0%9D%97%A5%F0%9D%97%98-%F0%9D%97%96%F0%9D%97%98%F0%9D%97%A1%F0%9D%97%A7%F0%9D%97%98%F0%9D%97%A5-%F0%9D%97%9F%F0%9D%97%9F%F0%9D%97%96 |
| 3808 | 𝘼𝙉𝙔𝙒𝙃𝙀𝙍𝙀 𝘼𝙐𝙏𝙊 𝘋𝘦𝘵𝘢𝘪𝘭 𝘚𝘵𝘶𝘥𝘪𝘰 | "𝘼𝙉𝙔𝙒𝙃𝙀𝙍𝙀-𝘼𝙐𝙏𝙊-𝘋𝘦𝘵𝘢𝘪𝘭-𝘚𝘵𝘶𝘥𝘪𝘰" | https://www.easyfinder.ae/vendors/%F0%9D%98%BC%F0%9D%99%89%F0%9D%99%94%F0%9D%99%92%F0%9D%99%83%F0%9D%99%80%F0%9D%99%8D%F0%9D%99%80-%F0%9D%98%BC%F0%9D%99%90%F0%9D%99%8F%F0%9D%99%8A-%F0%9D%98%8B%F0%9D%98%A6%F0%9D%98%B5%F0%9D%98%A2%F0%9D%98%AA%F0%9D%98%AD-%F0%9D%98%9A%F0%9D%98%B5%F0%9D%98%B6%F0%9D%98%A5%F0%9D%98%AA%F0%9D%98%B0 |
| 3993 | 𝙋𝙤𝙬𝙚𝙧𝙩𝙚𝙘𝙝 𝘼𝙪𝙩𝙤 𝙎𝙚𝙧𝙫𝙞𝙘𝙚𝙨 | "𝙋𝙤𝙬𝙚𝙧𝙩𝙚𝙘𝙝-𝘼𝙪𝙩𝙤-𝙎𝙚𝙧𝙫𝙞𝙘𝙚𝙨" | https://www.easyfinder.ae/vendors/%F0%9D%99%8B%F0%9D%99%A4%F0%9D%99%AC%F0%9D%99%9A%F0%9D%99%A7%F0%9D%99%A9%F0%9D%99%9A%F0%9D%99%98%F0%9D%99%9D-%F0%9D%98%BC%F0%9D%99%AA%F0%9D%99%A9%F0%9D%99%A4-%F0%9D%99%8E%F0%9D%99%9A%F0%9D%99%A7%F0%9D%99%AB%F0%9D%99%9E%F0%9D%99%98%F0%9D%99%9A%F0%9D%99%A8 |

## B) Too short (7) — KEEP, no action (3M is a real brand)

| ID | Name | Slug |
|---|---|---|
| 3945 | 3M | 3m |
| 19040 | DG | dg |
| 21842 | Hi | hi |
| 21224 | IT | it |
| 22572 | W | w |
| 3180 | الامير لنسخ المفاتيح فرع 1 | الامير-لنسخ-المفاتيح-فرع-1 |
| 1218 | دار الظبي لتعهدات تنظيم حفلات الزفاف والاعراس فرع 01 | دار-الظبي-لتعهدات-تنظيم-حفلات-الزفاف-والاعراس-فرع-01 |

## C) Duplicate-slug groups (205) — winner KEEPS slug, losers 404 + exit sitemap

Winner rule (deterministic, override any row): has phone > has website > verified > has description > lower ID.

### `contact-us` — 24 vendors — winner: **854 · Contact Us**

| ID | Name | Decision | has |
|---|---|---|---|
| 854 | Contact Us | KEEP (winner) | phone, website, description |
| 948 | Contact Us | 404 + exit | phone, website, description |
| 181 | Contact Us | 404 + exit | phone, website, description |
| 586 | Contact Us | 404 + exit | phone, website, description |
| 469 | Contact Us | 404 + exit | phone, website, description |
| 373 | Contact Us | 404 + exit | phone, website, description |
| 692 | Contact Us | 404 + exit | phone, website, description |
| 1032 | Contact Us | 404 + exit | phone, website, description |
| 431 | Contact Us | 404 + exit | phone, website, description |
| 864 | Contact Us | 404 + exit | phone, website, description |
| 171 | Contact Us | 404 + exit | phone, website, description |
| 377 | Contact Us | 404 + exit | phone, website, description |
| 125 | Contact Us | 404 + exit | phone, website, description |
| 1061 | Contact Us | 404 + exit | phone, website, description |
| 449 | Contact Us | 404 + exit | phone, website, description |
| 161 | Contact Us | 404 + exit | phone, website, description |
| 926 | Contact Us | 404 + exit | phone, website, description |
| 799 | Contact Us | 404 + exit | phone, website, description |
| 191 | Contact Us | 404 + exit | phone, website, description |
| 549 | Contact Us | 404 + exit | phone, website, description |
| 658 | Contact Us | 404 + exit | phone, website, description |
| 695 | Contact Us | 404 + exit | phone, website, description |
| 179 | Contact Us | 404 + exit | phone, website, description |
| 328 | Contact us | 404 + exit | website, description |

### `emirates-driving-institute` — 22 vendors — winner: **6462 · Emirates Driving Institute**

| ID | Name | Decision | has |
|---|---|---|---|
| 6462 | Emirates Driving Institute | KEEP (winner) | phone, website, verified, description |
| 22432 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22475 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22393 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22395 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22471 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22474 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22476 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22502 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22503 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22512 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22531 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22532 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22483 | Emirates Driving Institute | 404 + exit | phone, verified, description |
| 22390 | Emirates Driving Institute | 404 + exit | phone, description |
| 22400 | Emirates Driving Institute | 404 + exit | phone, description |
| 22436 | Emirates Driving Institute | 404 + exit | phone, description |
| 22477 | Emirates Driving Institute | 404 + exit | phone, description |
| 22500 | Emirates Driving Institute | 404 + exit | phone, description |
| 22507 | Emirates Driving Institute | 404 + exit | phone, description |
| 22516 | Emirates Driving Institute | 404 + exit | phone, description |
| 22519 | Emirates Driving Institute | 404 + exit | phone, description |

### `contact` — 11 vendors — winner: **856 · Contact**

| ID | Name | Decision | has |
|---|---|---|---|
| 856 | Contact | KEEP (winner) | phone, website, description |
| 930 | Contact | 404 + exit | phone, website, description |
| 166 | Contact | 404 + exit | phone, website, description |
| 412 | Contact | 404 + exit | phone, website, description |
| 474 | Contact | 404 + exit | phone, website, description |
| 316 | Contact | 404 + exit | phone, website, description |
| 319 | Contact | 404 + exit | phone, website, description |
| 169 | Contact | 404 + exit | phone, website, description |
| 298 | Contact | 404 + exit | phone, website, description |
| 604 | Contact | 404 + exit | phone, website, description |
| 324 | Contact | 404 + exit | website, description |

### `junk-removal-dubai` — 5 vendors — winner: **681 · Junk Removal Dubai: Your Go-To Solution For A Clean And Clutter ...**

| ID | Name | Decision | has |
|---|---|---|---|
| 681 | Junk Removal Dubai: Your Go-To Solution For A Clean And Clutter ... | KEEP (winner) | phone, website, description |
| 7569 | Junk Removal dubai | 404 + exit | phone, website, verified, description |
| 23670 | JUNK REMOVAL DUBAI | 404 + exit | phone, verified, description |
| 23663 | Junk removal dubai | 404 + exit | phone, description |
| 677 | Junk Removal Dubai: Your Go-To Solution For A Clean And Clutter ... | 404 + exit | website, description |

### `miniso` — 5 vendors — winner: **16515 · MINISO**

| ID | Name | Decision | has |
|---|---|---|---|
| 16515 | MINISO | KEEP (winner) | phone, verified, description |
| 2110 | MINISO | 404 + exit | phone, website, verified, description |
| 16349 | MINISO | 404 + exit | phone, verified, description |
| 16472 | MINISO | 404 + exit | phone, verified, description |
| 16529 | MINISO | 404 + exit | phone, verified, description |

### `beauty-room-salon--spa` — 4 vendors — winner: **21839 · Beauty Room Salon & Spa**

| ID | Name | Decision | has |
|---|---|---|---|
| 21839 | Beauty Room Salon & Spa | KEEP (winner) | phone, verified, description |
| 21851 | Beauty Room Salon & Spa | 404 + exit | phone, verified, description |
| 20627 | Beauty Room Salon & Spa | 404 + exit | phone, verified, description |
| 20643 | Beauty Room Salon & Spa | 404 + exit | phone, verified, description |

### `home` — 4 vendors — winner: **320 · Home**

| ID | Name | Decision | has |
|---|---|---|---|
| 320 | Home | KEEP (winner) | phone, website, description |
| 616 | Home | 404 + exit | phone, website, description |
| 17473 | Home** | 404 + exit | phone, verified, description |
| 149 | Home | 404 + exit | website, description |

### `international-city` — 4 vendors — winner: **19359 · International city**

| ID | Name | Decision | has |
|---|---|---|---|
| 19359 | International city | KEEP (winner) | phone, verified, description |
| 22869 | International city | 404 + exit | verified, description |
| 16010 | International city | 404 + exit | description |
| 19096 | international city | 404 + exit | description |

### `locksmith-in-dubai` — 4 vendors — winner: **724 · Locksmith in Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 724 | Locksmith in Dubai | KEEP (winner) | phone, website, description |
| 721 | Locksmith in Dubai | 404 + exit | phone, website, description |
| 3186 | Locksmith In Dubai | 404 + exit | phone, website, verified, description |
| 711 | Locksmith in Dubai | 404 + exit | website, description |

### `movers-and-packers-in-abu-dhabi` — 4 vendors — winner: **797 · Movers and Packers in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 797 | Movers and Packers in Abu Dhabi | KEEP (winner) | phone, website, description |
| 1634 | Movers And Packers In Abu Dhabi | 404 + exit | phone, website, verified, description |
| 796 | Movers and Packers in Abu Dhabi | 404 + exit | website, description |
| 793 | Movers & Packers in Abu Dhabi: Top House & Furniture Services | 404 + exit | website, description |

### `3m-our-car-auto-accessories-fixing` — 3 vendors — winner: **21213 · 3M Our car auto accessories fixing**

| ID | Name | Decision | has |
|---|---|---|---|
| 21213 | 3M Our car auto accessories fixing | KEEP (winner) | phone, verified, description |
| 3930 | 3M Our Car Auto Accessories Fixing | 404 + exit | phone, website, verified, description |
| 20112 | 3M Our Car Auto Accessories Fixing | 404 + exit | phone, verified, description |

### `aluminium-and-glass-work-dubai` — 3 vendors — winner: **151 · Aluminium and Glass Work Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 151 | Aluminium and Glass Work Dubai | KEEP (winner) | phone, website, description |
| 3431 | Aluminium And Glass Work Dubai | 404 + exit | phone, website, verified, description |
| 143 | Aluminium and Glass Work Dubai | 404 + exit | website, description |

### `beyond-catering` — 3 vendors — winner: **335 · Beyond Catering**

| ID | Name | Decision | has |
|---|---|---|---|
| 335 | Beyond Catering | KEEP (winner) | phone, website, description |
| 5050 | Beyond Catering | 404 + exit | phone, website, verified, description |
| 329 | Beyond Catering | 404 + exit | website, description |

### `car-wash` — 3 vendors — winner: **228 · Car Wash**

| ID | Name | Decision | has |
|---|---|---|---|
| 228 | Car Wash | KEEP (winner) | website, description |
| 16186 | Car wash | 404 + exit | description |
| 16324 | car wash | 404 + exit | description |

### `dubai-driving-center` — 3 vendors — winner: **409 · Dubai Driving Center**

| ID | Name | Decision | has |
|---|---|---|---|
| 409 | Dubai Driving Center | KEEP (winner) | phone, website, description |
| 6443 | Dubai Driving Center | 404 + exit | phone, website, verified, description |
| 22490 | Dubai Driving center | 404 + exit | phone, verified, description |

### `dubai-investment-park-1` — 3 vendors — winner: **16157 · Dubai investment park 1**

| ID | Name | Decision | has |
|---|---|---|---|
| 16157 | Dubai investment park 1 | KEEP (winner) | phone, description |
| 18794 | Dubai investment Park 1 | 404 + exit | verified, description |
| 20845 | Dubai investment park 1 | 404 + exit | verified, description |

### `garden-tulip-flowers` — 3 vendors — winner: **16570 · Garden Tulip Flowers**

| ID | Name | Decision | has |
|---|---|---|---|
| 16570 | Garden Tulip Flowers | KEEP (winner) | phone, verified, description |
| 16664 | Garden Tulip Flowers | 404 + exit | phone, verified, description |
| 16714 | Garden Tulip Flowers | 404 + exit | phone, verified, description |

### `https` — 3 vendors — winner: **781 · https://www.camelliaroyaleretreat.site/**

| ID | Name | Decision | has |
|---|---|---|---|
| 781 | https://www.camelliaroyaleretreat.site/ | KEEP (winner) | website, description |
| 1130 | https://wa.me/+971553486284 | 404 + exit | website, description |
| 348 | https://wa.me/971503201004 | 404 + exit | website, description |

### `junk-removal` — 3 vendors — winner: **680 · Junk Removal: Remove My Junk Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 680 | Junk Removal: Remove My Junk Dubai | KEEP (winner) | phone, website, description |
| 23676 | Junk Removal | 404 + exit | phone, verified, description |
| 7678 | Junk Removal | 404 + exit | phone, description |

### `just-drive-car-wash` — 3 vendors — winner: **2168 · Just Drive Car Wash**

| ID | Name | Decision | has |
|---|---|---|---|
| 2168 | Just Drive Car Wash | KEEP (winner) | phone, website, verified, description |
| 16286 | Just Drive Car Wash | 404 + exit | phone, verified, description |
| 297 | just drive car wash | 404 + exit | website, description |

### `locksmith-dubai` — 3 vendors — winner: **714 · Locksmith Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 714 | Locksmith Dubai | KEEP (winner) | phone, website, description |
| 717 | Locksmith Dubai | 404 + exit | phone, website, description |
| 713 | Locksmith Dubai | 404 + exit | website, description |

### `magnolia-bakery` — 3 vendors — winner: **5550 · Magnolia Bakery**

| ID | Name | Decision | has |
|---|---|---|---|
| 5550 | Magnolia Bakery | KEEP (winner) | phone, website, verified, description |
| 20960 | Magnolia Bakery | 404 + exit | phone, verified, description |
| 21061 | Magnolia Bakery | 404 + exit | phone, verified, description |

### `massage-in-dubai` — 3 vendors — winner: **6496 · Massage in Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 6496 | Massage in Dubai | KEEP (winner) | phone, website, verified, description |
| 22364 | Massage In Dubai | 404 + exit | phone, verified, description |
| 22271 | Massage In Dubai | 404 + exit | phone, verified, description |

### `movers-and-packers-in-dubai` — 3 vendors — winner: **800 · Movers and Packers in Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 800 | Movers and Packers in Dubai | KEEP (winner) | phone, website, description |
| 1679 | Movers and packers in dubai | 404 + exit | phone, website, verified, description |
| 802 | Movers and Packers in Dubai | 404 + exit | website, description |

### `personal-trainer-dubai` — 3 vendors — winner: **21481 · PERSONAL TRAINER DUBAI**

| ID | Name | Decision | has |
|---|---|---|---|
| 21481 | PERSONAL TRAINER DUBAI | KEEP (winner) | phone, verified, description |
| 21615 | Personal trainer dubai | 404 + exit | phone, verified, description |
| 21463 | Personal trainer dubai | 404 + exit | phone, verified, description |

### `pest-control-abu-dhabi` — 3 vendors — winner: **841 · Pest Control Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 841 | Pest Control Abu Dhabi | KEEP (winner) | phone, website, description |
| 834 | Pest Control Abu Dhabi | 404 + exit | phone, website, description |
| 836 | Pest Control Abu Dhabi | 404 + exit | website, description |

### `restart-fitness-center--gym` — 3 vendors — winner: **21577 · ReStart Fitness Center & Gym**

| ID | Name | Decision | has |
|---|---|---|---|
| 21577 | ReStart Fitness Center & Gym | KEEP (winner) | phone, verified, description |
| 21578 | ReStart Fitness Center & Gym | 404 + exit | phone, verified, description |
| 21594 | ReStart Fitness Center & Gym | 404 + exit | phone, verified, description |

### `sal-sucr-ptisserie` — 3 vendors — winner: **20912 · Salé Sucré Pâtisserie**

| ID | Name | Decision | has |
|---|---|---|---|
| 20912 | Salé Sucré Pâtisserie | KEEP (winner) | phone, verified, description |
| 21066 | Salé Sucré Pâtisserie | 404 + exit | phone, verified, description |
| 20959 | Salé Sucré Pâtisserie | 404 + exit | phone, description |

### `spa` — 3 vendors — winner: **22603 · 东方神韵SPA会所**

| ID | Name | Decision | has |
|---|---|---|---|
| 22603 | 东方神韵SPA会所 | KEEP (winner) | phone, verified, description |
| 22610 | 琥珀·养生Spa | 404 + exit | phone, verified, description |
| 22261 | spa | 404 + exit | phone, description |

### `talal-electronics--home-appliance-store` — 3 vendors — winner: **17499 · Talal Electronics | Home Appliance Store**

| ID | Name | Decision | has |
|---|---|---|---|
| 17499 | Talal Electronics \| Home Appliance Store | KEEP (winner) | phone, description |
| 17527 | Talal Electronics \| Home Appliance Store | 404 + exit | phone, description |
| 17528 | Talal Electronics \| Home Appliance Store | 404 + exit | phone, description |

### `western-studio` — 3 vendors — winner: **14776 · Western Studio**

| ID | Name | Decision | has |
|---|---|---|---|
| 14776 | Western Studio | KEEP (winner) | phone, verified, description |
| 14815 | WESTERN STUDIO | 404 + exit | phone, verified, description |
| 14839 | Western Studio | 404 + exit | phone, verified, description |

### `3d-sign` — 2 vendors — winner: **7517 · 3D Sign**

| ID | Name | Decision | has |
|---|---|---|---|
| 7517 | 3D Sign | KEEP (winner) | phone, website, verified, description |
| 23598 | 3D Sign | 404 + exit | phone, verified, description |

### `3m-our-car-auto-accessories-fixing-llc` — 2 vendors — winner: **21204 · 3M Our Car Auto Accessories Fixing LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 21204 | 3M Our Car Auto Accessories Fixing LLC | KEEP (winner) | phone, description |
| 3948 | 3M Our Car Auto Accessories Fixing LLC | 404 + exit | phone, website, verified, description |

### `800-take-my-junk` — 2 vendors — winner: **7590 · 800 Take My Junk**

| ID | Name | Decision | has |
|---|---|---|---|
| 7590 | 800 Take My Junk | KEEP (winner) | website, verified, description |
| 23652 | 800 Take My Junk | 404 + exit | description |

### `abu-dhabi-blinds` — 2 vendors — winner: **2529 · Abu Dhabi Blinds**

| ID | Name | Decision | has |
|---|---|---|---|
| 2529 | Abu Dhabi Blinds | KEEP (winner) | phone, website, verified, description |
| 353 | Abu Dhabi Blinds: Made to Measure Blinds, Curtains & Shutters | 404 + exit | website, description |

### `abu-dhabi-rent-a-car` — 2 vendors — winner: **1931 · Abu Dhabi Rent a Car**

| ID | Name | Decision | has |
|---|---|---|---|
| 1931 | Abu Dhabi Rent a Car | KEEP (winner) | phone, website, verified, description |
| 256 | Abu Dhabi Rent a Car | 404 + exit | website, description |

### `ac-service-uae` — 2 vendors — winner: **16831 · Ac Service UAE**

| ID | Name | Decision | has |
|---|---|---|---|
| 16831 | Ac Service UAE | KEEP (winner) | phone, verified, description |
| 2585 | Ac Service UAE | 404 + exit | phone, description |

### `airchill-ac-maintenance-and-duct-cleaning` — 2 vendors — winner: **2606 · AirChill AC Maintenance and Duct Cleaning**

| ID | Name | Decision | has |
|---|---|---|---|
| 2606 | AirChill AC Maintenance and Duct Cleaning | KEEP (winner) | phone, website, verified, description |
| 17019 | AirChill AC Maintenance and Duct Cleaning | 404 + exit | phone, verified, description |

### `al-bassam-tanks-trading-llc` — 2 vendors — winner: **5799 · Al Bassam Tanks Trading L.L.C**

| ID | Name | Decision | has |
|---|---|---|---|
| 5799 | Al Bassam Tanks Trading L.L.C | KEEP (winner) | phone, website, verified, description |
| 19071 | Al Bassam Tanks Trading L.L.C | 404 + exit | phone, verified, description |

### `al-karmel-studio` — 2 vendors — winner: **1462 · Al Karmel Studio**

| ID | Name | Decision | has |
|---|---|---|---|
| 1462 | Al Karmel Studio | KEEP (winner) | phone, website, verified, description |
| 14257 | Al Karmel Studio | 404 + exit | phone, verified, description |

### `al-nadeem-automatic-tiles-and-marble-factory-llc` — 2 vendors — winner: **19279 · Al Nadeem Automatic Tiles and Marble Factory LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 19279 | Al Nadeem Automatic Tiles and Marble Factory LLC | KEEP (winner) | verified, description |
| 6104 | Al Nadeem Automatic Tiles and Marble Factory LLC | 404 + exit | description |

### `al-namariq-building-material-trading-al-quoz` — 2 vendors — winner: **3604 · Al Namariq Building Material Trading, Al Quoz**

| ID | Name | Decision | has |
|---|---|---|---|
| 3604 | Al Namariq Building Material Trading, Al Quoz | KEEP (winner) | phone, description |
| 19418 | Al Namariq Building Material Trading, Al Quoz | 404 + exit | phone, description |

### `al-qutbi-electrical-co-llc` — 2 vendors — winner: **14710 · Al Qutbi Electrical Co. L.L.C.**

| ID | Name | Decision | has |
|---|---|---|---|
| 14710 | Al Qutbi Electrical Co. L.L.C. | KEEP (winner) | phone, verified, description |
| 14613 | Al Qutbi Electrical Co LLC | 404 + exit | phone, description |

### `aluminium-and-glass-works-dubai` — 2 vendors — winner: **152 · Aluminium and Glass Works Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 152 | Aluminium and Glass Works Dubai | KEEP (winner) | phone, website, description |
| 142 | Aluminium and Glass Works Dubai | 404 + exit | website, description |

### `aluminum-windows-uae` — 2 vendors — winner: **19552 · Aluminum Windows UAE**

| ID | Name | Decision | has |
|---|---|---|---|
| 19552 | Aluminum Windows UAE | KEEP (winner) | phone, verified, description |
| 19587 | Aluminum Windows UAE | 404 + exit | verified, description |

### `alutal-aluminium-and-glass-llc` — 2 vendors — winner: **3446 · Alutal Aluminium and Glass llc**

| ID | Name | Decision | has |
|---|---|---|---|
| 3446 | Alutal Aluminium and Glass llc | KEEP (winner) | website, verified, description |
| 19422 | Alutal Aluminium and Glass llc | 404 + exit | verified, description |

### `apartment-and-villa-painting-services-dubai` — 2 vendors — winner: **17375 · Apartment And Villa Painting services Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 17375 | Apartment And Villa Painting services Dubai | KEEP (winner) | phone, verified, description |
| 17384 | apartment and villa Painting Services Dubai | 404 + exit | phone, verified, description |

### `ashwina-hair--beauty-salon` — 2 vendors — winner: **21971 · Ashwina Hair & Beauty Salon**

| ID | Name | Decision | has |
|---|---|---|---|
| 21971 | Ashwina Hair & Beauty Salon | KEEP (winner) | phone, verified, description |
| 21955 | Ashwina Hair & Beauty Salon | 404 + exit | phone, verified, description |

### `asian-pest-control` — 2 vendors — winner: **2560 · Asian Pest Control**

| ID | Name | Decision | has |
|---|---|---|---|
| 2560 | Asian Pest Control | KEEP (winner) | phone, website, verified, description |
| 17364 | Asian Pest Control | 404 + exit | phone, verified, description |

### `auto-electrician` — 2 vendors — winner: **19997 · Auto Electrician**

| ID | Name | Decision | has |
|---|---|---|---|
| 19997 | Auto Electrician | KEEP (winner) | phone, verified, description |
| 4053 | Auto Electrician | 404 + exit | phone, description |

### `auto-mechanical-geraje` — 2 vendors — winner: **15823 · auto mechanical geraje**

| ID | Name | Decision | has |
|---|---|---|---|
| 15823 | auto mechanical geraje | KEEP (winner) | phone, verified, description |
| 15797 | auto mechanical geraje | 404 + exit | phone, verified, description |

### `awal-experts` — 2 vendors — winner: **2705 · Awal Experts**

| ID | Name | Decision | has |
|---|---|---|---|
| 2705 | Awal Experts | KEEP (winner) | phone, website, verified, description |
| 17001 | Awal Experts | 404 + exit | phone, verified, description |

### `best-car-ac-garage-repair-service-in-abu-dhabi` — 2 vendors — winner: **208 · best car ac garage repair service in abu dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 208 | best car ac garage repair service in abu dhabi | KEEP (winner) | phone, website, description |
| 213 | best car ac garage repair service in abu dhabi | 404 + exit | website, description |

### `black-petals-flowers` — 2 vendors — winner: **16378 · Black Petals Flowers**

| ID | Name | Decision | has |
|---|---|---|---|
| 16378 | Black Petals Flowers | KEEP (winner) | phone, verified, description |
| 16627 | Black Petals Flowers | 404 + exit | phone, verified, description |

### `brillante-flowers` — 2 vendors — winner: **2432 · Brillante Flowers**

| ID | Name | Decision | has |
|---|---|---|---|
| 2432 | Brillante Flowers | KEEP (winner) | phone, website, verified, description |
| 490 | Brillante Flowers | 404 + exit | website, description |

### `brothers-gas-bottling--distribution-co-llc` — 2 vendors — winner: **23369 · Brothers Gas Bottling & Distribution Co. LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 23369 | Brothers Gas Bottling & Distribution Co. LLC | KEEP (winner) | phone, verified, description |
| 23386 | Brothers Gas Bottling & Distribution Co. LLC | 404 + exit | phone, verified, description |

### `broud-vission` — 2 vendors — winner: **5225 · Broud Vission**

| ID | Name | Decision | has |
|---|---|---|---|
| 5225 | Broud Vission | KEEP (winner) | website, verified, description |
| 19024 | Broud Vission | 404 + exit | description |

### `car-electrical-repair` — 2 vendors — winner: **246 · Car Electrical Repair**

| ID | Name | Decision | has |
|---|---|---|---|
| 246 | Car Electrical Repair | KEEP (winner) | phone, website, description |
| 253 | Car Electrical Repair | 404 + exit | website, description |

### `car-focus` — 2 vendors — winner: **4077 · Car Focus**

| ID | Name | Decision | has |
|---|---|---|---|
| 4077 | Car Focus | KEEP (winner) | phone, website, verified, description |
| 20103 | Car Focus | 404 + exit | phone, verified, description |

### `car-mc` — 2 vendors — winner: **3800 · CAR MC**

| ID | Name | Decision | has |
|---|---|---|---|
| 3800 | CAR MC | KEEP (winner) | phone, website, verified, description |
| 16130 | CAR MC | 404 + exit | phone, verified, description |

### `car-rental` — 2 vendors — winner: **267 · Car Rental**

| ID | Name | Decision | has |
|---|---|---|---|
| 267 | Car Rental | KEEP (winner) | phone, website, description |
| 254 | Car Rental | 404 + exit | website, description |

### `carpenter-bur-dubai` — 2 vendors — winner: **15430 · Carpenter Bur Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 15430 | Carpenter Bur Dubai | KEEP (winner) | phone, verified, description |
| 4210 | 🏠 CARPENTER BUR DUBAI 🪚 | 404 + exit | phone, description |

### `casper-gym` — 2 vendors — winner: **21348 · Casper Gym**

| ID | Name | Decision | has |
|---|---|---|---|
| 21348 | Casper Gym | KEEP (winner) | phone, verified, description |
| 21359 | CASPER GYM | 404 + exit | phone, verified, description |

### `cctv-camera-dubai` — 2 vendors — winner: **5205 · CCTV Camera Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 5205 | CCTV Camera Dubai | KEEP (winner) | phone, website, verified, description |
| 915 | CCTV Camera Dubai | 404 + exit | website, description |

### `cctv-dubai-uae.-cctv-security-camera-dubai` — 2 vendors — winner: **920 · CCTV Dubai UAE. CCTV Security Camera Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 920 | CCTV Dubai UAE. CCTV Security Camera Dubai | KEEP (winner) | phone, website, description |
| 910 | CCTV Dubai UAE. CCTV Security Camera Dubai | 404 + exit | website, description |

### `cctv-installation-dubai` — 2 vendors — winner: **5102 · CCTV installation dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 5102 | CCTV installation dubai | KEEP (winner) | phone, website, verified, description |
| 18441 | CCTV Installation Dubai | 404 + exit | phone, verified, description |

### `celebrating-life-bakery` — 2 vendors — winner: **5576 · Celebrating Life Bakery**

| ID | Name | Decision | has |
|---|---|---|---|
| 5576 | Celebrating Life Bakery | KEEP (winner) | phone, website, verified, description |
| 175 | Celebrating Life Bakery: Premium Cake Shop in Abu Dhabi | 404 + exit | website, description |

### `city-solar` — 2 vendors — winner: **970 · City Solar**

| ID | Name | Decision | has |
|---|---|---|---|
| 970 | City Solar | KEEP (winner) | phone, website, description |
| 5825 | City Solar | 404 + exit | phone, website, verified, description |

### `classic-quality-marble-and-decor-trading-(ceramic-and-sanitary)` — 2 vendors — winner: **997 · Classic Quality Marble and Decor Trading (Ceramic and Sanitary)**

| ID | Name | Decision | has |
|---|---|---|---|
| 997 | Classic Quality Marble and Decor Trading (Ceramic and Sanitary) | KEEP (winner) | phone, website, description |
| 991 | Classic Quality Marble and Decor Trading (Ceramic and Sanitary) | 404 + exit | website, description |

### `contact-` — 2 vendors — winner: **613 · Contact : Al Arabi Gypsum & False Ceiling Works,Dubai , United ...**

| ID | Name | Decision | has |
|---|---|---|---|
| 613 | Contact : Al Arabi Gypsum & False Ceiling Works,Dubai , United ... | KEEP (winner) | phone, website, description |
| 647 | Contact : Fiber Optic Cabling Installation,Dubai , United Arab Emirates | 404 + exit | website, description |

### `corporate-event-planners` — 2 vendors — winner: **480 · Corporate Event Planners**

| ID | Name | Decision | has |
|---|---|---|---|
| 480 | Corporate Event Planners | KEEP (winner) | phone, website, description |
| 476 | Corporate Event Planners | 404 + exit | website, description |

### `creative-garden-landscaping-company-llc` — 2 vendors — winner: **4587 · Creative Garden Landscaping Company. LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 4587 | Creative Garden Landscaping Company. LLC | KEEP (winner) | website, verified, description |
| 18292 | Creative Garden Landscaping Company. LLC | 404 + exit | verified, description |

### `curtain-installation-dubai` — 2 vendors — winner: **357 · Curtain Installation Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 357 | Curtain Installation Dubai | KEEP (winner) | phone, website, description |
| 360 | Curtain Installation Dubai | 404 + exit | website, description |

### `curtains-fixing-dubai` — 2 vendors — winner: **364 · Curtains Fixing Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 364 | Curtains Fixing Dubai | KEEP (winner) | phone, website, description |
| 358 | Curtains Fixing Dubai | 404 + exit | website, description |

### `custom-weldingfabrication-service-(per-hour)` — 2 vendors — winner: **112 · Custom Welding/Fabrication Service (Per Hour)**

| ID | Name | Decision | has |
|---|---|---|---|
| 112 | Custom Welding/Fabrication Service (Per Hour) | KEEP (winner) | phone, website, description |
| 1158 | Custom Welding/Fabrication Service (Per Hour) | 404 + exit | phone, website, description |

### `dar-al-marjaan-legal-translation-services` — 2 vendors — winner: **5322 · Dar Al Marjaan Legal Translation Services**

| ID | Name | Decision | has |
|---|---|---|---|
| 5322 | Dar Al Marjaan Legal Translation Services | KEEP (winner) | phone, website, verified, description |
| 21100 | Dar Al Marjaan Legal Translation Services | 404 + exit | phone, verified, description |

### `dawar-all-warqa-auto-electric` — 2 vendors — winner: **3990 · DAWAR All Warqa Auto electric**

| ID | Name | Decision | has |
|---|---|---|---|
| 3990 | DAWAR All Warqa Auto electric | KEEP (winner) | website, verified, description |
| 20015 | DAWAR All Warqa Auto electric | 404 + exit | verified, description |

### `desco-copy--print-center---dso-photo-studio` — 2 vendors — winner: **14890 · DESCO Copy & Print Center - DSO (Photo Studio)**

| ID | Name | Decision | has |
|---|---|---|---|
| 14890 | DESCO Copy & Print Center - DSO (Photo Studio) | KEEP (winner) | phone, verified, description |
| 14881 | DESCO Copy & Print Center - DSO (Photo Studio) | 404 + exit | phone, verified, description |

### `digital-marketing-freelancer-in-dubai` — 2 vendors — winner: **22999 · Digital Marketing Freelancer In Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 22999 | Digital Marketing Freelancer In Dubai | KEEP (winner) | phone, verified, description |
| 23163 | Digital marketing freelancer in dubai | 404 + exit | phone, verified, description |

### `document-clearing-services-in-dubai|-uae|-alabaqira` — 2 vendors — winner: **395 · Document Clearing Services in Dubai| Uae| Alabaqira**

| ID | Name | Decision | has |
|---|---|---|---|
| 395 | Document Clearing Services in Dubai\| Uae\| Alabaqira | KEEP (winner) | phone, website, description |
| 398 | Document Clearing Services in Dubai\| Uae\| Alabaqira | 404 + exit | website, description |

### `document-clearing-services-llc-provider-in-abu-dhabi-dubai` — 2 vendors — winner: **390 · Document Clearing Services LLC Provider in Abu Dhabi, Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 390 | Document Clearing Services LLC Provider in Abu Dhabi, Dubai | KEEP (winner) | phone, website, description |
| 387 | Document Clearing Services LLC Provider in Abu Dhabi, Dubai | 404 + exit | website, description |

### `drywall-and-false-ceiling-supplier-in-abu-dhabi-dubai` — 2 vendors — winner: **596 · Drywall & False Ceiling Supplier in Abu Dhabi, Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 596 | Drywall & False Ceiling Supplier in Abu Dhabi, Dubai | KEEP (winner) | phone, website, description |
| 603 | Drywall & False Ceiling Supplier in Abu Dhabi, Dubai | 404 + exit | website, description |

### `dubai-blinds-and-curtains` — 2 vendors — winner: **16779 · Dubai Blinds and Curtains**

| ID | Name | Decision | has |
|---|---|---|---|
| 16779 | Dubai Blinds and Curtains | KEEP (winner) | phone, verified, description |
| 16822 | Dubai Blinds And Curtains | 404 + exit | phone, verified, description |

### `dubai-boat-catering` — 2 vendors — winner: **5034 · Dubai Boat Catering**

| ID | Name | Decision | has |
|---|---|---|---|
| 5034 | Dubai Boat Catering | KEEP (winner) | website, verified, description |
| 20520 | Dubai Boat Catering | 404 + exit | verified, description |

### `dubai-car-repair-online-service-247-support-onsite` — 2 vendors — winner: **527 · Dubai Car Repair Online Service 24/7 Support Onsite**

| ID | Name | Decision | has |
|---|---|---|---|
| 527 | Dubai Car Repair Online Service 24/7 Support Onsite | KEEP (winner) | phone, website, description |
| 537 | Dubai Car Repair Online Service 24/7 Support Onsite | 404 + exit | website, description |

### `dubai-furniture-factory` — 2 vendors — winner: **17906 · Dubai Furniture Factory**

| ID | Name | Decision | has |
|---|---|---|---|
| 17906 | Dubai Furniture Factory | KEEP (winner) | verified, description |
| 4213 | Dubai Furniture Factory | 404 + exit | description |

### `dubai-investment-park` — 2 vendors — winner: **22447 · dubai investment park**

| ID | Name | Decision | has |
|---|---|---|---|
| 22447 | dubai investment park | KEEP (winner) | description |
| 22450 | Dubai investment park | 404 + exit | description |

### `dubai-municipality-pest-control` — 2 vendors — winner: **843 · Dubai Municipality Pest Control**

| ID | Name | Decision | has |
|---|---|---|---|
| 843 | Dubai Municipality Pest Control | KEEP (winner) | phone, website, description |
| 849 | Dubai Municipality Pest Control | 404 + exit | phone, website, description |

### `dubaicontentpro` — 2 vendors — winner: **1445 · DubaiContent.Pro**

| ID | Name | Decision | has |
|---|---|---|---|
| 1445 | DubaiContent.Pro | KEEP (winner) | website, verified, description |
| 14927 | DubaiContent.Pro | 404 + exit | verified, description |

### `dunlop-proshop` — 2 vendors — winner: **19843 · Dunlop ProShop**

| ID | Name | Decision | has |
|---|---|---|---|
| 19843 | Dunlop ProShop | KEEP (winner) | phone, verified, description |
| 19939 | Dunlop ProShop | 404 + exit | phone, verified, description |

### `eco-drive-driving-institute` — 2 vendors — winner: **22389 · Eco Drive Driving Institute**

| ID | Name | Decision | has |
|---|---|---|---|
| 22389 | Eco Drive Driving Institute | KEEP (winner) | phone, description |
| 22422 | Eco Drive Driving Institute | 404 + exit | phone, description |

### `elevator-maintece-services` — 2 vendors — winner: **447 · Elevator Maintece Services**

| ID | Name | Decision | has |
|---|---|---|---|
| 447 | Elevator Maintece Services | KEEP (winner) | phone, website, description |
| 450 | Elevator Maintece Services | 404 + exit | website, description |

### `elite-curtains` — 2 vendors — winner: **2295 · Elite Curtains**

| ID | Name | Decision | has |
|---|---|---|---|
| 2295 | Elite Curtains | KEEP (winner) | phone, website, verified, description |
| 16771 | Elite Curtains | 404 + exit | phone, verified, description |

### `elite-detailing` — 2 vendors — winner: **19676 · Elite Detailing**

| ID | Name | Decision | has |
|---|---|---|---|
| 19676 | Elite Detailing | KEEP (winner) | phone, verified, description |
| 232 | Elite Detailing | 404 + exit | website, description |

### `emarat-car-wash` — 2 vendors — winner: **16140 · Emarat Car Wash**

| ID | Name | Decision | has |
|---|---|---|---|
| 16140 | Emarat Car Wash | KEEP (winner) | phone, description |
| 16214 | Emarat Car Wash | 404 + exit | description |

### `emirates-electrical-engineering` — 2 vendors — winner: **433 · Emirates Electrical Engineering**

| ID | Name | Decision | has |
|---|---|---|---|
| 433 | Emirates Electrical Engineering | KEEP (winner) | phone, website, description |
| 14725 | Emirates Electrical Engineering | 404 + exit | phone, verified, description |

### `eryx-training-center-llc` — 2 vendors — winner: **21718 · ERYX TRAINING CENTER L.L.C**

| ID | Name | Decision | has |
|---|---|---|---|
| 21718 | ERYX TRAINING CENTER L.L.C | KEEP (winner) | phone, verified, description |
| 21653 | ERYX Training Center LLC | 404 + exit | phone, verified, description |

### `everyday-technical-work` — 2 vendors — winner: **3043 · Everyday Technical Work**

| ID | Name | Decision | has |
|---|---|---|---|
| 3043 | Everyday Technical Work | KEEP (winner) | website, verified, description |
| 17020 | Everyday Technical Work | 404 + exit | verified, description |

### `excellence-driving-school` — 2 vendors — winner: **22492 · Excellence Driving School**

| ID | Name | Decision | has |
|---|---|---|---|
| 22492 | Excellence Driving School | KEEP (winner) | phone, verified, description |
| 6440 | Excellence Driving School | 404 + exit | phone, website, verified, description |

### `false-ceiling-and-drywall-systems` — 2 vendors — winner: **600 · False Ceiling And Drywall Systems**

| ID | Name | Decision | has |
|---|---|---|---|
| 600 | False Ceiling And Drywall Systems | KEEP (winner) | phone, website, description |
| 605 | False Ceiling And Drywall Systems | 404 + exit | website, description |

### `french-bakery` — 2 vendors — winner: **5563 · French Bakery**

| ID | Name | Decision | has |
|---|---|---|---|
| 5563 | French Bakery | KEEP (winner) | phone, website, verified, description |
| 21057 | French Bakery | 404 + exit | phone, verified, description |

### `furniture-assembly` — 2 vendors — winner: **510 · Furniture Assembly**

| ID | Name | Decision | has |
|---|---|---|---|
| 510 | Furniture Assembly | KEEP (winner) | phone, website, description |
| 499 | Furniture Assembly | 404 + exit | phone, website, description |

### `generator-maintece-services` — 2 vendors — winner: **569 · Generator Maintece Services**

| ID | Name | Decision | has |
|---|---|---|---|
| 569 | Generator Maintece Services | KEEP (winner) | phone, website, description |
| 559 | Generator Maintece Services | 404 + exit | website, description |

### `generator-repair-and-service` — 2 vendors — winner: **560 · Generator Repair & Service**

| ID | Name | Decision | has |
|---|---|---|---|
| 560 | Generator Repair & Service | KEEP (winner) | phone, website, description |
| 570 | Generator Repair & Service | 404 + exit | website, description |

### `gift-dubai-online` — 2 vendors — winner: **2108 · Gift Dubai Online**

| ID | Name | Decision | has |
|---|---|---|---|
| 2108 | Gift Dubai Online | KEEP (winner) | phone, website, verified, description |
| 589 | Gift Dubai Online | 404 + exit | website, description |

### `glass-works-in-dubai` — 2 vendors — winner: **141 · Glass works in Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 141 | Glass works in Dubai | KEEP (winner) | phone, website, description |
| 150 | Glass works in Dubai | 404 + exit | website, description |

### `glow-beauty-center` — 2 vendors — winner: **5445 · GLOW Beauty Center**

| ID | Name | Decision | has |
|---|---|---|---|
| 5445 | GLOW Beauty Center | KEEP (winner) | phone, website, verified, description |
| 886 | Glow Beauty Center | 404 + exit | website, description |

### `good-day-auto-electrical-repairs` — 2 vendors — winner: **4008 · Good Day Auto Electrical Repairs**

| ID | Name | Decision | has |
|---|---|---|---|
| 4008 | Good Day Auto Electrical Repairs | KEEP (winner) | phone, website, verified, description |
| 20016 | Good Day Auto Electrical Repairs | 404 + exit | phone, description |

### `green-renewable-energy` — 2 vendors — winner: **5740 · Green Renewable Energy**

| ID | Name | Decision | has |
|---|---|---|---|
| 5740 | Green Renewable Energy | KEEP (winner) | description |
| 19158 | Green Renewable Energy | 404 + exit | description |

### `gulf-car-washing-and-greasing-station` — 2 vendors — winner: **293 · Gulf Car Washing And Greasing Station**

| ID | Name | Decision | has |
|---|---|---|---|
| 293 | Gulf Car Washing And Greasing Station | KEEP (winner) | phone, website, description |
| 295 | Gulf Car Washing And Greasing Station | 404 + exit | website, description |

### `gulf-welding-services-est` — 2 vendors — winner: **23266 · GULF WELDING SERVICES EST.**

| ID | Name | Decision | has |
|---|---|---|---|
| 23266 | GULF WELDING SERVICES EST. | KEEP (winner) | phone, verified, description |
| 7190 | GULF WELDING SERVICES EST. | 404 + exit | phone, description |

### `gypsum-work` — 2 vendors — winner: **3582 · Gypsum work**

| ID | Name | Decision | has |
|---|---|---|---|
| 3582 | Gypsum work | KEEP (winner) | phone, description |
| 19589 | gypsum work | 404 + exit | description |

### `gypsum-work-services` — 2 vendors — winner: **3584 · Gypsum work services**

| ID | Name | Decision | has |
|---|---|---|---|
| 3584 | Gypsum work services | KEEP (winner) | website, verified, description |
| 19590 | Gypsum work services | 404 + exit | verified, description |

### `haneef-carpentry` — 2 vendors — winner: **317 · Haneef Carpentry**

| ID | Name | Decision | has |
|---|---|---|---|
| 317 | Haneef Carpentry | KEEP (winner) | phone, website, description |
| 1754 | Haneef Carpentry | 404 + exit | phone, website, verified, description |

### `high-gold-building-materials-llc` — 2 vendors — winner: **19595 · High Gold Building Materials LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 19595 | High Gold Building Materials LLC | KEEP (winner) | verified, description |
| 3618 | High Gold Building Materials LLC | 404 + exit | description |

### `home-appliances-repair` — 2 vendors — winner: **3080 · Home Appliances Repair**

| ID | Name | Decision | has |
|---|---|---|---|
| 3080 | Home Appliances Repair | KEEP (winner) | phone, description |
| 167 | Home appliances repair | 404 + exit | website, description |

### `home-internet-services` — 2 vendors — winner: **5215 · Home Internet Services**

| ID | Name | Decision | has |
|---|---|---|---|
| 5215 | Home Internet Services | KEEP (winner) | phone, website, verified, description |
| 18806 | Home Internet Services | 404 + exit | phone, verified, description |

### `home-massage-dubai` — 2 vendors — winner: **777 · Home Massage Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 777 | Home Massage Dubai | KEEP (winner) | phone, website, description |
| 22218 | Home massage dubai | 404 + exit | phone, verified, description |

### `home-network-cable-service` — 2 vendors — winner: **646 · Home Network Cable Service**

| ID | Name | Decision | has |
|---|---|---|---|
| 646 | Home Network Cable Service | KEEP (winner) | phone, website, description |
| 650 | Home Network Cable Service | 404 + exit | website, description |

### `home-window-tinting-of-al-ain-abu-dhabi` — 2 vendors — winner: **278 · Home Window Tinting of Al Ain, Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 278 | Home Window Tinting of Al Ain, Abu Dhabi | KEEP (winner) | phone, website, description |
| 275 | Home Window Tinting of Al Ain, Abu Dhabi | 404 + exit | website, description |

### `house-of-cuts-barbershop` — 2 vendors — winner: **6398 · House of Cuts Barbershop**

| ID | Name | Decision | has |
|---|---|---|---|
| 6398 | House of Cuts Barbershop | KEEP (winner) | phone, website, verified, description |
| 22086 | House of Cuts Barbershop | 404 + exit | phone, verified, description |

### `igraphics` — 2 vendors — winner: **7628 · iGraphics**

| ID | Name | Decision | has |
|---|---|---|---|
| 7628 | iGraphics | KEEP (winner) | phone, website, verified, description |
| 23576 | iGraphics | 404 + exit | phone, verified, description |

### `imprint-photo-studio` — 2 vendors — winner: **1451 · Imprint Photo Studio**

| ID | Name | Decision | has |
|---|---|---|---|
| 1451 | Imprint Photo Studio | KEEP (winner) | phone, website, verified, description |
| 14929 | Imprint Photo Studio | 404 + exit | phone, verified, description |

### `internet-service-provider` — 2 vendors — winner: **5235 · Internet service provider**

| ID | Name | Decision | has |
|---|---|---|---|
| 5235 | Internet service provider | KEEP (winner) | phone, description |
| 18807 | internet service provider | 404 + exit | phone, description |

### `irrigation-landscape-services-co-llc` — 2 vendors — winner: **18361 · Irrigation landscape services co llc**

| ID | Name | Decision | has |
|---|---|---|---|
| 18361 | Irrigation landscape services co llc | KEEP (winner) | phone, verified, description |
| 18334 | Irrigation landscape services co llc | 404 + exit | phone, verified, description |

### `it-services-and-solutions-company-in-abu-dhabi` — 2 vendors — winner: **654 · IT Services and Solutions Company in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 654 | IT Services and Solutions Company in Abu Dhabi | KEEP (winner) | phone, website, description |
| 660 | IT Services and Solutions Company in Abu Dhabi | 404 + exit | website, description |

### `jk-masters-barbershop` — 2 vendors — winner: **22194 · JK Masters Barbershop**

| ID | Name | Decision | has |
|---|---|---|---|
| 22194 | JK Masters Barbershop | KEEP (winner) | phone, verified, description |
| 22207 | JK Masters Barbershop | 404 + exit | phone, verified, description |

### `juma-al-majid-home-appliance` — 2 vendors — winner: **3068 · Juma Al Majid Home Appliance**

| ID | Name | Decision | has |
|---|---|---|---|
| 3068 | Juma Al Majid Home Appliance | KEEP (winner) | phone, website, verified, description |
| 17593 | Juma Al Majid Home Appliance | 404 + exit | phone, verified, description |

### `justcare` — 2 vendors — winner: **3327 · Justcare**

| ID | Name | Decision | has |
|---|---|---|---|
| 3327 | Justcare | KEEP (winner) | website, verified, description |
| 17750 | Justcare | 404 + exit | verified, description |

### `laquila-curtains--decor---` — 2 vendors — winner: **16734 · Laquila Curtains & Decor لاكويلا للستائر والديكور**

| ID | Name | Decision | has |
|---|---|---|---|
| 16734 | Laquila Curtains & Decor لاكويلا للستائر والديكور | KEEP (winner) | phone, verified, description |
| 16781 | Laquila Curtains & Decor لاكويلا للستائر والديكور | 404 + exit | phone, verified, description |

### `lets-control-tech` — 2 vendors — winner: **942 · Lets Control Tech**

| ID | Name | Decision | has |
|---|---|---|---|
| 942 | Lets Control Tech | KEEP (winner) | website, description |
| 19642 | Lets Control tech | 404 + exit | verified, description |

### `locksmith-near-me` — 2 vendors — winner: **722 · Locksmith Near Me**

| ID | Name | Decision | has |
|---|---|---|---|
| 722 | Locksmith Near Me | KEEP (winner) | phone, website, description |
| 712 | Locksmith Near Me | 404 + exit | website, description |

### `locksmith-service-in-abu-dhabi` — 2 vendors — winner: **709 · Locksmith Service in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 709 | Locksmith Service in Abu Dhabi | KEEP (winner) | phone, website, description |
| 704 | Locksmith Service in Abu Dhabi | 404 + exit | website, description |

### `mac` — 2 vendors — winner: **5463 · M.A.C**

| ID | Name | Decision | has |
|---|---|---|---|
| 5463 | M.A.C | KEEP (winner) | phone, website, verified, description |
| 20883 | M.A.C | 404 + exit | phone, verified, description |

### `magic-touch-auto-garage` — 2 vendors — winner: **521 · Magic Touch Auto Garage**

| ID | Name | Decision | has |
|---|---|---|---|
| 521 | Magic Touch Auto Garage | KEEP (winner) | phone, website, description |
| 523 | Magic Touch Auto Garage | 404 + exit | website, description |

### `maison-des-fleurs` — 2 vendors — winner: **2410 · Maison des Fleurs**

| ID | Name | Decision | has |
|---|---|---|---|
| 2410 | Maison des Fleurs | KEEP (winner) | phone, website, verified, description |
| 495 | Maison Des Fleurs: Flower Shop | 404 + exit | website, description |

### `makeup-artist` — 2 vendors — winner: **5437 · Makeup artist**

| ID | Name | Decision | has |
|---|---|---|---|
| 5437 | Makeup artist | KEEP (winner) | phone, website, verified, description |
| 20695 | makeup artist | 404 + exit | phone, description |

### `malabar-glass--aluminium-trading-llc` — 2 vendors — winner: **19502 · Malabar Glass & Aluminium Trading LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 19502 | Malabar Glass & Aluminium Trading LLC | KEEP (winner) | phone, verified, description |
| 19497 | MALABAR GLASS & ALUMINIUM TRADING LLC. | 404 + exit | phone, description |

### `marhaba-advertising` — 2 vendors — winner: **22979 · Marhaba Advertising**

| ID | Name | Decision | has |
|---|---|---|---|
| 22979 | Marhaba Advertising | KEEP (winner) | phone, verified, description |
| 23587 | Marhaba Advertising | 404 + exit | phone, verified, description |

### `marktec-pool-company` — 2 vendors — winner: **18369 · marktec pool company**

| ID | Name | Decision | has |
|---|---|---|---|
| 18369 | marktec pool company | KEEP (winner) | verified, description |
| 4733 | marktec pool company | 404 + exit | description |

### `masdar-city-10mw-solar-photovoltaic-farm` — 2 vendors — winner: **5738 · Masdar City 10MW Solar Photovoltaic Farm**

| ID | Name | Decision | has |
|---|---|---|---|
| 5738 | Masdar City 10MW Solar Photovoltaic Farm | KEEP (winner) | website, verified, description |
| 19160 | Masdar City 10MW Solar Photovoltaic Farm | 404 + exit | verified, description |

### `mason` — 2 vendors — winner: **750 · Mason**

| ID | Name | Decision | has |
|---|---|---|---|
| 750 | Mason | KEEP (winner) | phone, website, description |
| 758 | Mason | 404 + exit | website, description |

### `mason-worker-supply-in-abu-dhabi` — 2 vendors — winner: **754 · Mason Worker Supply in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 754 | Mason Worker Supply in Abu Dhabi | KEEP (winner) | phone, website, description |
| 745 | Mason Worker Supply in Abu Dhabi | 404 + exit | website, description |

### `massage-center` — 2 vendors — winner: **6574 · massage center**

| ID | Name | Decision | has |
|---|---|---|---|
| 6574 | massage center | KEEP (winner) | phone, website, verified, description |
| 22287 | massage center | 404 + exit | phone, verified, description |

### `max-gym` — 2 vendors — winner: **6057 · Max Gym**

| ID | Name | Decision | has |
|---|---|---|---|
| 6057 | Max Gym | KEEP (winner) | phone, website, verified, description |
| 21444 | Max Gym | 404 + exit | phone, verified, description |

### `meccademia-education-institute` — 2 vendors — winner: **21622 · Meccademia Education Institute**

| ID | Name | Decision | has |
|---|---|---|---|
| 21622 | Meccademia Education Institute | KEEP (winner) | phone, verified, description |
| 21662 | Meccademia Education Institute | 404 + exit | phone, verified, description |

### `minutes` — 2 vendors — winner: **3234 · Minutes**

| ID | Name | Decision | has |
|---|---|---|---|
| 3234 | Minutes | KEEP (winner) | phone, website, verified, description |
| 17680 | Minutes | 404 + exit | phone, verified, description |

### `mobile-car-mechanic-dubai` — 2 vendors — winner: **20009 · Mobile Car Mechanic Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 20009 | Mobile Car Mechanic Dubai | KEEP (winner) | phone, verified, description |
| 15926 | Mobile car mechanic Dubai | 404 + exit | phone, verified, description |

### `modern-bakery-llc` — 2 vendors — winner: **20759 · Modern Bakery LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 20759 | Modern Bakery LLC | KEEP (winner) | phone, verified, description |
| 20984 | Modern Bakery LLC | 404 + exit | phone, verified, description |

### `modest-gift` — 2 vendors — winner: **2119 · Modest Gift**

| ID | Name | Decision | has |
|---|---|---|---|
| 2119 | Modest Gift | KEEP (winner) | phone, description |
| 575 | Modest Gift: Home | 404 + exit | website, description |

### `moon-light-car-care` — 2 vendors — winner: **205 · Moon Light Car Care: Car Battery & AC Gas Refilling Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 205 | Moon Light Car Care: Car Battery & AC Gas Refilling Abu Dhabi | KEEP (winner) | phone, website, description |
| 4103 | Moon Light Car Care | 404 + exit | phone, website, verified, description |

### `movers-and-packers` — 2 vendors — winner: **14247 · Movers And Packers**

| ID | Name | Decision | has |
|---|---|---|---|
| 14247 | Movers And Packers | KEEP (winner) | phone, verified, description |
| 7543 | Movers and packers | 404 + exit | phone, description |

### `muhammad-hanif-khadim-carpentry-llc` — 2 vendors — winner: **15420 · Muhammad Hanif khadim carpentry LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 15420 | Muhammad Hanif khadim carpentry LLC | KEEP (winner) | phone, description |
| 15421 | Muhammad Hanif khadim carpentry LLC | 404 + exit | description |

### `naturals-salon` — 2 vendors — winner: **21857 · Naturals Salon**

| ID | Name | Decision | has |
|---|---|---|---|
| 21857 | Naturals Salon | KEEP (winner) | phone, verified, description |
| 21945 | Naturals Salon | 404 + exit | phone, verified, description |

### `networking-and-communication--` — 2 vendors — winner: **640 · NETWORKING & COMMUNICATION -**

| ID | Name | Decision | has |
|---|---|---|---|
| 640 | NETWORKING & COMMUNICATION - | KEEP (winner) | phone, website, description |
| 634 | NETWORKING & COMMUNICATION - | 404 + exit | website, description |

### `occasions-cake-shop` — 2 vendors — winner: **5592 · Occasions Cake shop**

| ID | Name | Decision | has |
|---|---|---|---|
| 5592 | Occasions Cake shop | KEEP (winner) | phone, website, verified, description |
| 20855 | Occasions Cake Shop | 404 + exit | phone, verified, description |

### `oceanic-cleaning-and-environmental-services` — 2 vendors — winner: **5774 · OCEANIC CLEANING AND ENVIRONMENTAL SERVICES**

| ID | Name | Decision | has |
|---|---|---|---|
| 5774 | OCEANIC CLEANING AND ENVIRONMENTAL SERVICES | KEEP (winner) | phone, website, verified, description |
| 1096 | Oceanic Cleaning and Environmental Services | 404 + exit | website, description |

### `optima-fitness-branch` — 2 vendors — winner: **21399 · Optima Fitness Branch**

| ID | Name | Decision | has |
|---|---|---|---|
| 21399 | Optima Fitness Branch | KEEP (winner) | phone, verified, description |
| 21528 | Optima Fitness Branch | 404 + exit | verified, description |

### `otis-llc` — 2 vendors — winner: **23230 · Otis LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 23230 | Otis LLC | KEEP (winner) | phone, description |
| 7454 | OTIS LLC | 404 + exit | phone, description |

### `painting-services-dubai` — 2 vendors — winner: **816 · Painting Services Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 816 | Painting Services Dubai | KEEP (winner) | phone, website, description |
| 2876 | Painting Services Dubai | 404 + exit | phone, website, verified, description |

### `painting-services-in-abu-dhabi` — 2 vendors — winner: **810 · Painting Services in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 810 | Painting Services in Abu Dhabi | KEEP (winner) | phone, website, description |
| 805 | Painting Services in Abu Dhabi | 404 + exit | website, description |

### `parka-bakehouse` — 2 vendors — winner: **20868 · PARKA Bakehouse**

| ID | Name | Decision | has |
|---|---|---|---|
| 20868 | PARKA Bakehouse | KEEP (winner) | phone, verified, description |
| 5636 | PARKA Bakehouse | 404 + exit | phone, description |

### `paul-bakery--restaurant` — 2 vendors — winner: **20854 · PAUL Bakery & Restaurant**

| ID | Name | Decision | has |
|---|---|---|---|
| 20854 | PAUL Bakery & Restaurant | KEEP (winner) | phone, verified, description |
| 21051 | PAUL Bakery & Restaurant | 404 + exit | phone, verified, description |

### `pest-control-dubai` — 2 vendors — winner: **850 · Pest Control Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 850 | Pest Control Dubai | KEEP (winner) | phone, website, description |
| 845 | Pest Control Dubai | 404 + exit | website, description |

### `plumbing-solutions` — 2 vendors — winner: **870 · Plumbing Solutions**

| ID | Name | Decision | has |
|---|---|---|---|
| 870 | Plumbing Solutions | KEEP (winner) | phone, website, description |
| 881 | Plumbing Solutions | 404 + exit | phone, website, description |

### `posh-and-classy-beauty-salon` — 2 vendors — winner: **897 · Posh & Classy Beauty Salon: 5 Star Google Rated Salon for Hair ...**

| ID | Name | Decision | has |
|---|---|---|---|
| 897 | Posh & Classy Beauty Salon: 5 Star Google Rated Salon for Hair ... | KEEP (winner) | phone, website, description |
| 21946 | Posh and Classy Beauty Salon | 404 + exit | phone, verified, description |

### `professional-furniture-movers-and-packers-llc` — 2 vendors — winner: **16051 · Professional Furniture Movers and Packers L.L.C**

| ID | Name | Decision | has |
|---|---|---|---|
| 16051 | Professional Furniture Movers and Packers L.L.C | KEEP (winner) | phone, verified, description |
| 1665 | Professional Furniture Movers and Packers L.L.C | 404 + exit | phone, description |

### `professional-movers-and-packers` — 2 vendors — winner: **14298 · Professional Movers And Packers**

| ID | Name | Decision | has |
|---|---|---|---|
| 14298 | Professional Movers And Packers | KEEP (winner) | phone, description |
| 15063 | Professional Movers and Packers | 404 + exit | phone, description |

### `quick-ever-cleaning-services` — 2 vendors — winner: **5073 · Quick Ever Cleaning Services**

| ID | Name | Decision | has |
|---|---|---|---|
| 5073 | Quick Ever Cleaning Services | KEEP (winner) | website, verified, description |
| 19108 | Quick Ever Cleaning Services | 404 + exit | verified, description |

### `quick-pest-control` — 2 vendors — winner: **2575 · Quick Pest Control**

| ID | Name | Decision | has |
|---|---|---|---|
| 2575 | Quick Pest Control | KEEP (winner) | phone, website, verified, description |
| 17481 | Quick Pest Control | 404 + exit | phone, verified, description |

### `ranis-beauty-saloon` — 2 vendors — winner: **896 · Ranis Beauty Saloon**

| ID | Name | Decision | has |
|---|---|---|---|
| 896 | Ranis Beauty Saloon | KEEP (winner) | phone, website, description |
| 21937 | Ranis Beauty Saloon | 404 + exit | phone, verified, description |

### `ras-al-khor` — 2 vendors — winner: **22808 · Ras al khor**

| ID | Name | Decision | has |
|---|---|---|---|
| 22808 | Ras al khor | KEEP (winner) | phone, verified, description |
| 16193 | Ras al khor | 404 + exit | verified, description |

### `rm-painters-abu-dhabi` — 2 vendors — winner: **2903 · RM Painters Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 2903 | RM Painters Abu Dhabi | KEEP (winner) | phone, website, verified, description |
| 809 | RM Painters Abu Dhabi: Best Home And Interior Paint Services In ... | 404 + exit | website, description |

### `roi-focused-digital-marketing-agency-in-abu-dhabi` — 2 vendors — winner: **375 · ROI-focused Digital Marketing Agency in Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 375 | ROI-focused Digital Marketing Agency in Abu Dhabi | KEEP (winner) | phone, website, description |
| 366 | ROI-focused Digital Marketing Agency in Abu Dhabi | 404 + exit | website, description |

### `rose-king-flowers` — 2 vendors — winner: **16666 · Rose King Flowers**

| ID | Name | Decision | has |
|---|---|---|---|
| 16666 | Rose King Flowers | KEEP (winner) | phone, verified, description |
| 16712 | Rose King Flowers | 404 + exit | phone, verified, description |

### `safuansteelwork` — 2 vendors — winner: **113 · Safuansteelwork**

| ID | Name | Decision | has |
|---|---|---|---|
| 113 | Safuansteelwork | KEEP (winner) | phone, website, description |
| 1157 | Safuansteelwork | 404 + exit | phone, website, description |

### `sapphire-swimming-pools-maintenance-llc` — 2 vendors — winner: **4686 · Sapphire Swimming Pools Maintenance llc**

| ID | Name | Decision | has |
|---|---|---|---|
| 4686 | Sapphire Swimming Pools Maintenance llc | KEEP (winner) | website, verified, description |
| 18387 | Sapphire Swimming Pools Maintenance llc | 404 + exit | verified, description |

### `sharaf-dg-energy` — 2 vendors — winner: **5848 · Sharaf DG Energy**

| ID | Name | Decision | has |
|---|---|---|---|
| 5848 | Sharaf DG Energy | KEEP (winner) | website, verified, description |
| 19130 | Sharaf DG Energy | 404 + exit | description |

### `shati-alwaha-tyres-trading--car-accessories` — 2 vendors — winner: **19833 · SHATI ALWAHA Tyres Trading & Car Accessories**

| ID | Name | Decision | has |
|---|---|---|---|
| 19833 | SHATI ALWAHA Tyres Trading & Car Accessories | KEEP (winner) | phone, description |
| 19827 | SHATI ALWAHA Tyres Trading & Car Accessories | 404 + exit | phone, description |

### `siemens-service-center` — 2 vendors — winner: **17504 · Siemens Service Center**

| ID | Name | Decision | has |
|---|---|---|---|
| 17504 | Siemens Service Center | KEEP (winner) | phone, verified, description |
| 17586 | Siemens Service Center | 404 + exit | phone, verified, description |

### `skylar-events` — 2 vendors — winner: **464 · Skylar Events: Event Management Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 464 | Skylar Events: Event Management Abu Dhabi | KEEP (winner) | phone, website, description |
| 470 | Skylar Events: Home | 404 + exit | website, description |

### `smart-home-solutions-in-dubai` — 2 vendors — winner: **955 · Smart Home Solutions in Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 955 | Smart Home Solutions in Dubai | KEEP (winner) | phone, website, description |
| 949 | Smart Home Solutions in Dubai | 404 + exit | website, description |

### `smart-home-systems` — 2 vendors — winner: **938 · Smart Home Systems**

| ID | Name | Decision | has |
|---|---|---|---|
| 938 | Smart Home Systems | KEEP (winner) | phone, website, description |
| 952 | Smart Home Systems | 404 + exit | website, description |

### `smart-studio` — 2 vendors — winner: **1522 · Smart Studio**

| ID | Name | Decision | has |
|---|---|---|---|
| 1522 | Smart Studio | KEEP (winner) | phone, website, verified, description |
| 14793 | Smart studio | 404 + exit | phone, verified, description |

### `space-embrace-interior-decoration-llc` — 2 vendors — winner: **4461 · Space Embrace Interior Decoration LLC**

| ID | Name | Decision | has |
|---|---|---|---|
| 4461 | Space Embrace Interior Decoration LLC | KEEP (winner) | website, verified, description |
| 18604 | Space Embrace Interior Decoration LLC | 404 + exit | verified, description |

### `spider-packers-and-movers` — 2 vendors — winner: **1690 · Spider Packers and Movers**

| ID | Name | Decision | has |
|---|---|---|---|
| 1690 | Spider Packers and Movers | KEEP (winner) | phone, website, verified, description |
| 804 | Spider Packers and Movers: Professional Movers and Packers | 404 + exit | website, description |

### `structured-cabling-installers-in-dubai-uae` — 2 vendors — winner: **645 · Structured Cabling Installers in Dubai, UAE**

| ID | Name | Decision | has |
|---|---|---|---|
| 645 | Structured Cabling Installers in Dubai, UAE | KEEP (winner) | phone, website, description |
| 649 | Structured Cabling Installers in Dubai, UAE | 404 + exit | phone, website, description |

### `sweepz-cleaning-services` — 2 vendors — winner: **342 · Sweepz Cleaning Services: Home**

| ID | Name | Decision | has |
|---|---|---|---|
| 342 | Sweepz Cleaning Services: Home | KEEP (winner) | phone, website, description |
| 16866 | Sweepz Cleaning Services | 404 + exit | phone, verified, description |

### `swimming` — 2 vendors — winner: **18367 · Swimming**

| ID | Name | Decision | has |
|---|---|---|---|
| 18367 | Swimming | KEEP (winner) | verified, description |
| 4713 | Swimming | 404 + exit | description |

### `swimming-pool-maintece-services-dubai` — 2 vendors — winner: **982 · Swimming Pool Maintece Services Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 982 | Swimming Pool Maintece Services Dubai | KEEP (winner) | phone, website, description |
| 983 | Swimming Pool Maintece Services Dubai | 404 + exit | phone, website, description |

### `takemyjunk-uae` — 2 vendors — winner: **682 · TakeMyJunk UAE**

| ID | Name | Decision | has |
|---|---|---|---|
| 682 | TakeMyJunk UAE | KEEP (winner) | phone, website, description |
| 669 | TakeMyJunk UAE | 404 + exit | website, description |

### `tall-photographer` — 2 vendors — winner: **1457 · Tall Photographer**

| ID | Name | Decision | has |
|---|---|---|---|
| 1457 | Tall Photographer | KEEP (winner) | phone, website, verified, description |
| 855 | Tall Photographer: Professional Freelance Photographers in Dubai | 404 + exit | website, description |

### `the-gift-shop-uae` — 2 vendors — winner: **585 · The Gift Shop UAE: Flower Delivery Al Ain**

| ID | Name | Decision | has |
|---|---|---|---|
| 585 | The Gift Shop UAE: Flower Delivery Al Ain | KEEP (winner) | phone, website, description |
| 580 | The Gift Shop UAE: Flower Delivery Al Ain | 404 + exit | website, description |

### `the-perfect-gift` — 2 vendors — winner: **16436 · The Perfect Gift®**

| ID | Name | Decision | has |
|---|---|---|---|
| 16436 | The Perfect Gift® | KEEP (winner) | phone, verified, description |
| 2107 | The Perfect Gift® | 404 + exit | website, verified, description |

### `the-trainers-gym` — 2 vendors — winner: **21432 · The Trainers Gym**

| ID | Name | Decision | has |
|---|---|---|---|
| 21432 | The Trainers Gym | KEEP (winner) | verified, description |
| 5978 | The Trainers Gym | 404 + exit | description |

### `the-wedding-atelier` — 2 vendors — winner: **1152 · The Wedding Atelier: Wedding Planner & Event Company Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 1152 | The Wedding Atelier: Wedding Planner & Event Company Dubai | KEEP (winner) | phone, website, description |
| 1576 | The Wedding Atelier | 404 + exit | phone, website, verified, description |

### `tire-zone-tyre-trading-ras-al-khor` — 2 vendors — winner: **3887 · Tire Zone Tyre Trading (Ras al Khor)**

| ID | Name | Decision | has |
|---|---|---|---|
| 3887 | Tire Zone Tyre Trading (Ras al Khor) | KEEP (winner) | phone, website, verified, description |
| 19824 | Tire Zone Tyre Trading (Ras al Khor) | 404 + exit | phone, verified, description |

### `translation-center` — 2 vendors — winner: **5343 · TRANSLATION CENTER**

| ID | Name | Decision | has |
|---|---|---|---|
| 5343 | TRANSLATION CENTER | KEEP (winner) | phone, website, verified, description |
| 21290 | Translation Center | 404 + exit | phone, verified, description |

### `uae-smarthomes-–-bespoke-design-installation-and-programming-...` — 2 vendors — winner: **956 · UAE Smarthomes – Bespoke design, installation and programming ...**

| ID | Name | Decision | has |
|---|---|---|---|
| 956 | UAE Smarthomes – Bespoke design, installation and programming ... | KEEP (winner) | phone, website, description |
| 950 | UAE Smarthomes – Bespoke design, installation and programming ... | 404 + exit | website, description |

### `virtual-pro` — 2 vendors — winner: **21168 · Virtual PRO**

| ID | Name | Decision | has |
|---|---|---|---|
| 21168 | Virtual PRO | KEEP (winner) | phone, verified, description |
| 21011 | Virtual PRO | 404 + exit | phone, verified, description |

### `water-tank-cleaning-services-dubai` — 2 vendors — winner: **1107 · water tank cleaning services Dubai**

| ID | Name | Decision | has |
|---|---|---|---|
| 1107 | water tank cleaning services Dubai | KEEP (winner) | phone, website, description |
| 1109 | water tank cleaning services Dubai | 404 + exit | website, description |

### `webtek-digital` — 2 vendors — winner: **22700 · Webtek Digital**

| ID | Name | Decision | has |
|---|---|---|---|
| 22700 | Webtek Digital | KEEP (winner) | phone, verified, description |
| 18827 | Webtek Digital | 404 + exit | phone, description |

### `wedding-planner-abu-dhabi` — 2 vendors — winner: **1139 · Wedding Planner Abu Dhabi**

| ID | Name | Decision | has |
|---|---|---|---|
| 1139 | Wedding Planner Abu Dhabi | KEEP (winner) | phone, website, description |
| 1143 | Wedding Planner Abu Dhabi | 404 + exit | website, description |

### `white-blossoms-flower-boutique` — 2 vendors — winner: **2418 · White Blossoms Flower Boutique**

| ID | Name | Decision | has |
|---|---|---|---|
| 2418 | White Blossoms Flower Boutique | KEEP (winner) | phone, website, verified, description |
| 16624 | White Blossoms Flower Boutique | 404 + exit | phone, verified, description |

### `work-company` — 2 vendors — winner: **3591 · Work company**

| ID | Name | Decision | has |
|---|---|---|---|
| 3591 | Work company | KEEP (winner) | description |
| 19603 | Work company | 404 + exit | description |

---

**Proposed implementation, after your approval:**
1. Directus PATCH: for each loser/degenerate vendor, set `slug` to a unique machine suffix (e.g. append `-v<id>`) — reversible, no deletion, no mass redirects. Vendors themselves stay published and findable in /search and /vendors browse.
2. Code: re-push sitemap (it reads slugs live); no app-code change needed if we just fix the slugs, because sitemap.ts already maps vendor.slug one-to-one. (If we want a code-level safety gate too, I will add one in sitemap.ts as a filter — small diff.)
3. GSC: resubmit sitemap + VALIDATE FIX on the canonical/redirect rows (the 1,208 "Crawled not indexed" + 11 "alternate/redirect" buckets).

Nothing else changes: /vendors browse, /search, /categories, reviews, schema — all untouched.