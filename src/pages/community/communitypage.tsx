import { ListCard } from '@/components/communitypage/ListCard';
import { NavigationMenu } from '@/components/communitypage/NavigationMenu';
import { SearchOption } from '@/components/communitypage/SearchOption';
import { SearchInput } from '@/components/communitypage/SearchInput';
import { CreateButton } from '@/components/communitypage/CreateButton';
import { CommunityPagination } from '@/components/communitypage/Pagination';
import { ArrayOption } from '@/components/communitypage/ArrayOption';
import { postList } from '@/mocks/postList';
import { Link, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

function CommunityPage() {
  const posts = postList.results;

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '전체';

  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [selectedCategory, posts]);

  return (
    <div className="mx-auto mt-30 mb-50 flex max-w-[944px] flex-col items-center gap-4">
      <header className="mx-auto flex w-full flex-col gap-4">
        <Link
          to="/community"
          state={{ category: selectedCategory }}
          className="text-[32px] font-bold"
        >
          커뮤니티
        </Link>

        <section className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SearchOption />
            <SearchInput />
          </div>
          <div>
            <CreateButton />
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
        {filteredPosts.map((post) => (
          <Link to={`/community/${post.id}`} key={post.id}>
            <ListCard post={post} category={post.category} />
          </Link>
        ))}
        <hr />
      </main>

      <footer className="flex justify-center">
        <CommunityPagination />
      </footer>
    </div>
  );
}

export default CommunityPage;
