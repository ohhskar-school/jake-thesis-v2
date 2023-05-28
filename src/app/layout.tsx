import "@/styles/base.scss";

export const metadata = {
  title: "Jake Boiwa",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
