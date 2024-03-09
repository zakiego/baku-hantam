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
      "https://twitter.com/lynxluna/status/1765387033026150820",
      "https://twitter.com/gadingnstn/status/1766353424126476406",
      "https://twitter.com/ainunnajib/status/1766385680916328700",
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
];
