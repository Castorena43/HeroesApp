import { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className='row row-cols-3 row-cols-md-2 row-cols-sm-1 g-4 animate__animated animate__fadeIn'>
      {
        heroes.map(heroe => (
          <HeroCard key={ heroe.id } { ...heroe } />
        ))
      }
    </div>
  )
}
