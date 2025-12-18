import { ListCard } from '@/components/communitypage/ListCard';
import { NavigationMenu } from '@/components/communitypage/NavigationMenu';
import { SearchOption } from '@/components/communitypage/SearchOption';
import { SearchInput } from '@/components/communitypage/SearchInput';
import { SearchButton } from '@/components/communitypage/SearchButton';
import { CommunityPagination } from '@/components/communitypage/Pagination';
import { ArrayOption } from '@/components/communitypage/ArrayOption';

function CommunityPage() {
  return (
    <div className="mx-auto mt-30 mb-50 flex max-w-[944px] flex-col items-center gap-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <h1 className="text-[32px] font-bold">커뮤니티</h1>
        <section className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchOption />
            <SearchInput />
          </div>
          <div>
            <SearchButton />
          </div>
        </section>

        <section className="flex items-center justify-between gap-4">
          <div>
            <NavigationMenu />
          </div>
          <div>
            <ArrayOption />
          </div>
        </section>
        <hr />
      </header>

      <main className="mb-10 flex flex-col gap-4">
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <ListCard />
        <hr />
      </main>

      <footer className="flex justify-center">
        <CommunityPagination />
      </footer>
    </div>
  );
}

export default CommunityPage;
