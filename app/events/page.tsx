import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { EventsPage } from '@/components/events-page';

export default function EventsRoute() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <EventsPage />
      </main>
      <Footer />
    </div>
  );
}
