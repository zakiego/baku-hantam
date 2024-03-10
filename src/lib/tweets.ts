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
      "Dimulai dari pembahasan tentang konfigurasi, lalu berlanjut ke topik yang lebih seru.",
    tweets: [
      "https://twitter.com/lynxluna/status/1765387033026150820", // 09:40 PM · Mar 6, 2024
      "https://twitter.com/gadingnstn/status/1765730273121931653", // 08:24 PM · Mar 7, 2024
      "https://twitter.com/glendmaatita/status/1765899052913508505", // 07:34 AM · Mar 8, 2024
      "https://twitter.com/itsfaqih_/status/1765946838828650749", // 10:45 AM · Mar 8, 2024
      "https://twitter.com/spacerocc/status/1766125691844870249", // 10:35 PM · Mar 8, 2024
      "https://twitter.com/justmas2biasa/status/1766032926523957700", // 04:27 PM · Mar 8, 2024
      "https://twitter.com/lynxluna/status/1766246109574557887", // 06:34 AM · Mar 9, 2024
      "https://twitter.com/effendii_/status/1766313916936986873", // 11:03 AM · Mar 9, 2024
      "https://twitter.com/Aoohan/status/1766341607056679223", // 12:53 PM · Mar 9, 2024
      "https://twitter.com/gadingnstn/status/1766353424126476406", // 01:40 PM · Mar 9, 2024
      "https://twitter.com/maulanafikri455/status/1766357540206772724", // 01:57 PM · Mar 9, 2024
      "https://twitter.com/ainunnajib/status/1766385680916328700", // 03:48 PM · Mar 9, 2024
      "https://twitter.com/lynxluna/status/1766393800069648691", // 04:21 PM · Mar 9, 2024
      "https://twitter.com/gadingnstn/status/1766399528142283007", // 04:44 PM · Mar 9, 2024
      "https://twitter.com/itsfaqih_/status/1766402190242123961", // 04:54 PM · Mar 9, 2024
      "https://twitter.com/glendmaatita/status/1766417693677433131", // 05:56 PM · Mar 9, 2024
      "https://twitter.com/gadingnstn/status/1766487332528504988", // 10:32 PM · Mar 9, 2024
      "https://twitter.com/itsfaqih_/status/1766483265224151166", // 10:16 PM · Mar 9, 2024
    ],
  },
  {
    title: "PHP di Project Pemerintah",
    slug: "php-project-pemerintah",
    description: "Serba-serbi PHP di project pemerintah.",
    tweets: [
      "https://twitter.com/papanberjalan/status/1760865776423379040",
      "https://twitter.com/papanberjalan/status/1764999095767425221",
    ],
  },
  {
    title: "ORM vs Non-ORM",
    slug: "orm-vs-non-orm",
    description: "Pertarungan antara ORM dan Non-ORM.",
    tweets: ["https://twitter.com/papanberjalan/status/1758656922834907523"],
  },
];
