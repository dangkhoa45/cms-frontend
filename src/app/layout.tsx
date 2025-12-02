import { SWRProvider } from "@/components/providers/SWRProvider";

export const metadata = {
  title: "CMS Multi-Site",
  description: "Enterprise Multi-Site Content Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body style={{ margin: 0, padding: 0 }}>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
