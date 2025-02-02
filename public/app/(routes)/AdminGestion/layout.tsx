
import type { Metadata } from "next";
import NavbarTop from "@/components/NavbarTop/NavbarTop";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   

      <div className="min-h-screen flex flex-col">
      
      <div className="md:block w-full">
        <NavbarTop />
      </div>

      <div className="flex-grow w-full mt-12"> 
      {children}
      </div>
    </div>


  );
}
