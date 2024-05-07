import { notFound } from 'next/navigation';

const CatchAllPage = () => {
  return (
    <div>
      {/* Ваше содержимое страницы */}
      {notFound()}
    </div>
  );
};

export default CatchAllPage;
