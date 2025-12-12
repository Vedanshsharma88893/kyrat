import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CampusMap } from '@/components/campus-map';

export default function CampusMapRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <CampusMap />
      </main>
      <Footer />
    </div>
  );
}
