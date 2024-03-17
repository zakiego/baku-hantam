export type Debates = {
  title: string;
  slug: string;
  description: string;
  tweets: string[];
}[];

// Note: silakan tambahkan data sesuai dengan format yang sudah ada
export const debates: Debates = [
  {
    title: "Config 2 Jam",
    slug: "config-2-jam",
    description:
      "Dimulai dari pembahasan tentang konfigurasi, lalu berlanjut ke topik yang lebih seru",
    tweets: [
      "https://twitter.com/lynxluna/status/1765387033026150820", // 9:40 PM · Mar 6, 2024

      // "https://twitter.com/gadingnstn/status/1765730273121931653", // 8:24 PM · Mar 7, 2024

      "https://twitter.com/glendmaatita/status/1765899052913508505", // 7:34 AM · Mar 8, 2024
      "https://twitter.com/itsfaqih_/status/1765946838828650749", // 10:45 AM · Mar 8, 2024
      "https://twitter.com/spacerocc/status/1766125691844870249", // 10:35 PM · Mar 8, 2024

      "https://twitter.com/lynxluna/status/1766246109574557887", // 6:34 AM · Mar 9, 2024
      "https://twitter.com/effendii_/status/1766313916936986873", // 11:03 AM · Mar 9, 2024
      "https://twitter.com/Aoohan/status/1766341607056679223", // 12:53 PM · Mar 9, 2024
      // "https://twitter.com/gadingnstn/status/1766353424126476406", // 1:40 PM · Mar 9, 2024
      "https://twitter.com/maulanafikri455/status/1766357540206772724", // 1:57 PM · Mar 9, 2024
      "https://twitter.com/ainunnajib/status/1766385680916328700", // 3:48 PM · Mar 9, 2024
      "https://twitter.com/lynxluna/status/1766393800069648691", // 4:21 PM · Mar 9, 2024
      // "https://twitter.com/gadingnstn/status/1766399528142283007", // 4:44 PM · Mar 9, 2024
      "https://twitter.com/itsfaqih_/status/1766402190242123961", // 4:54 PM · Mar 9, 2024
      "https://twitter.com/glendmaatita/status/1766417693677433131", // 5:56 PM · Mar 9, 2024
      // "https://twitter.com/gadingnstn/status/1766487332528504988", // 10:32 PM · Mar 9, 2024
      "https://twitter.com/_fikri_auliya/status/1766434423535554922", // Mar 9, 2024 · 7:02 PM
      "https://twitter.com/itsfaqih_/status/1766483265224151166", // 10:16 PM · Mar 9, 2024

      "https://twitter.com/GilangHamidy/status/1766762321710322142", // Mar 10, 2024 · 4:45 PM
      "https://twitter.com/Maz_Ipan/status/1766783140906033176", // Mar 10, 2024 · 6:08 PM
    ],
  },
  {
    title: "Performance 300ms",
    slug: "300ms",
    description: "Sepenting itukah performance 300ms?",
    tweets: [
      "https://twitter.com/lwastuargo/status/1711903789660451030", // 7:37 AM · Oct 11, 2023
      // "https://twitter.com/gadingnstn/status/1711912952444620975", // 8:13 AM · Oct 11, 2023
      "https://twitter.com/zakkafm/status/1711917377858969683", // 8:31 AM · Oct 11, 2023
      "https://twitter.com/ibamarief/status/1711918572061249625", // 8:36 AM · Oct 11, 2023
      // "https://twitter.com/gadingnstn/status/1711928763892789718", // 9:16 AM · Oct 11, 2023
      "https://twitter.com/lynxluna/status/1711935480869392650", // 9:43 AM · Oct 11, 2023
      // "https://twitter.com/gadingnstn/status/1711949064215187786", // 10:37 AM · Oct 11, 2023
      // "https://twitter.com/gadingnstn/status/1712055544675180921", // 5:40 PM · Oct 11, 2023
    ],
  },
  {
    title: "PHP di Project Pemerintah",
    slug: "php-project-pemerintah",
    description: "Serba-serbi PHP di project pemerintah",
    tweets: [
      "https://twitter.com/papanberjalan/status/1760865776423379040", // Feb 23, 2024 · 10:14 AM
      "https://twitter.com/papanberjalan/status/1764999095767425221", // Mar 5, 2024 · 7:59 PM
      "https://twitter.com/papanberjalan/status/1765200273025429871", // Mar 6, 2024 · 9:18 AM
      "https://twitter.com/nusendra_/status/1765242091511111767", // Mar 6, 2024 · 12:04 AM

      "https://twitter.com/papanberjalan/status/1766651163515216049", // Mar 10, 2024 · 10:23 AM
      "https://twitter.com/papanberjalan/status/1766784180749480368", //  Mar 10, 2024 · 7:12 PM
      "https://twitter.com/papanberjalan/status/1766794287524815167", // Mar 10, 2024 · 7:52 PM
      "https://twitter.com/itsfaqih_/status/1766796143017828701", // Mar 10, 2024 · 7:00 PM
      "https://twitter.com/_fikri_auliya/status/1766850432129986853", // Mar 10, 2024 · 10:35 PM

      "https://twitter.com/ibnux/status/1767030242869490035", // Mar 11, 2024 · 10:30 AM
      "https://twitter.com/papanberjalan/status/1767071098821337332", // Mar 11, 2024 · 1:12 PM
      "https://twitter.com/ibnux/status/1767032763428028453", // Mar 11, 2024 · 11:40 AM ·

      "https://twitter.com/papanberjalan/status/1767826082525569098", // Mar 13, 2024 · 3:12 PM ✅
    ],
  },
  {
    title: "ORM vs Non-ORM",
    slug: "orm-vs-non-orm",
    description: "Pertarungan antara ORM dan Non-ORM.",
    tweets: [
      "https://twitter.com/qepo_s/status/1702571153657852077", // 1:32 PM · Sep 15, 2023
      "https://twitter.com/papanberjalan/status/1758656922834907523",
    ],
  },
  {
    title: "OOP vs Functional Programming",
    slug: "oop-vs-fp",
    description: "Pertarungan antara OOP dan Functional Programming",
    tweets: [
      "https://twitter.com/lynxluna/status/1670279219270791170", // Jun 18, 2023 · 10:56 AM
    ],
  },
  {
    title: "Matematika anak SD",
    slug: "matematika-anak-sd",
    description: "Cukupkah matematika anak SD untuk menjadi programmer?",
    tweets: [
      "https://twitter.com/azamuddin91/status/1658698623587340288", // May 17, 2023 · 11:59 PM
      "https://twitter.com/azamuddin91/status/1658976885999808513",
      "https://twitter.com/pveyes/status/1658971075856986113", // May 18, 2023 · 6:01 AM ·
      "https://twitter.com/ibamarief/status/1658865294499278848", // May 18, 2023 · 11:01 AM
      "https://twitter.com/GilangHamidy/status/1659095860687372288",
      "https://twitter.com/oianas_/status/1658988297514016768",
      "https://twitter.com/aria_ghora/status/1658871096194797568",
      "https://twitter.com/gofrendiasgard/status/1659147104424714242",
      "https://twitter.com/petrabarus/status/1659361668110118913",
      "https://twitter.com/primawansatrio/status/1659800774740971520",
      "https://twitter.com/__r17x/status/1659064806471770113",
      "https://twitter.com/AleamsBarra/status/1659161199672692738",
      "https://twitter.com/azamuddin91/status/1658989261318922241", // May 18, 2023 · 7:13 AM
      "https://twitter.com/imrenagi/status/1672726303269609472", // Jun 25, 2023 · 5:00 AM
      "https://twitter.com/azamuddin91/status/1672777437208522752", // Jun 25, 2023 · 8:23 AM
    ],
  },
  {
    title: "AI Pencuri Karya",
    slug: "ai-pencuri-karya",
    description: "Apakah AI mencuri hasil karya pelaku industri kreatif?",
    tweets: [
      "https://twitter.com/aria_ghora/status/1724106609885061428", // Nov 14, 2023 · 11:47 AM
      "https://twitter.com/aria_ghora/status/1752517633017319545", // Jan 31, 2024 · 9:22 AM
      "https://twitter.com/mctosima_/status/1752584416655016403", // Jan 31, 2024 · 1:47 PM
    ],
  },
  {
    title: "Penting Nggak Kuliah?",
    slug: "penting-nggak-kuliah",
    description: "Apakah kuliah itu penting?",
    tweets: [
      "https://twitter.com/primawansatrio/status/1767123216198435284", // Mar 11, 2024 · 4:39 PM
      "https://twitter.com/itsfaqih_/status/1767133774062690463", // Mar 11, 2024 · 5:21 PM
      "https://twitter.com/effendii_/status/1767154915892490416", // Mar 11, 2024 · 6:45 PM
      "https://twitter.com/adith_wp/status/1767206766264389686", // Mar 11, 2024 · 10:11 PM
    ],
  },
  {
    title: "Bootcamp VS Lulusan IT",
    slug: "bootcamp-vs-lulusan-it",
    description: "Pertarungan antara bootcamp dan lulusan IT",
    tweets: [
      "https://twitter.com/imrenagi/status/1593768309337776129", // Nov 19, 2022 · 7:49 AM
      "https://twitter.com/strike_bravo_b/status/1594164029354020865", // Nov 20, 2022 · 10:01 AM
      "https://twitter.com/imrenagi/status/1647602548017188865", // Apr 16, 2023 · 9:07 PM
    ],
  },
  {
    title: "SQL vs NoSQL",
    slug: "sql-vs-nosql",
    description: "Pertarungan antara SQL dan NoSQL",
    tweets: [
      "https://twitter.com/papanberjalan/status/1755014790429458818", // Feb 7, 2024 · 6:45 AM ✅
      "https://twitter.com/ainunnajib/status/1755035799668838610", // Feb 7, 2024 · 8:08 AM ✅
      "https://twitter.com/lynxluna/status/1767798718366109983", // Mar 13, 2024 · 1:23 PM ✅
    ],
  },
  {
    title: "NPM Install Engineer",
    slug: "npm-install-engineer",
    description: "Engineer yang hanya bisa `npm install`",
    tweets: [
      "https://twitter.com/lynxluna/status/1767965882041643356",
      "https://twitter.com/thomaskatalis/status/1767967096980517243",
      "https://twitter.com/lynxluna/status/1767970397620941027",
      "https://twitter.com/papanberjalan/status/1768034401882177557",
      "https://twitter.com/Aoohan/status/1768223423204036730",
      "https://twitter.com/sapelauu/status/1768224364271665383",
      "https://twitter.com/adith_wp/status/1768107763048325332",
    ],
  },
];
