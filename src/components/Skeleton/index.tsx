import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={500}
    viewBox='0 0 350 540'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <circle cx='155' cy='155' r='156' />
    <rect x='0' y='359' rx='10' ry='10' width='140' height='23' />
    <rect x='0' y='396' rx='10' ry='10' width='350' height='88' />
    <rect x='0' y='506' rx='10' ry='10' width='95' height='20' />
    <rect x='200' y='493' rx='24' ry='24' width='152' height='45' />
  </ContentLoader>
);

export default Skeleton;
