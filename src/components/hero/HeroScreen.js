import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

  const navigate = useNavigate();
  const { heroeId } = useParams();

  const heroe = useMemo(() => getHeroById( heroeId ), [heroeId]) 

  if (!heroe) return <Navigate to='/' />

  const {
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = heroe

  const imagePath = `/assets/${id}.jpg`

  const handleReturned = () => {
    navigate(-1)
  }

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img src={ imagePath } className='img-thumbnail animate__animated animate__fadeInLeft' alt={ superhero } />
      </div>
      <div className='col-8 animate__animated animate__fadeIn'>
        <h3>{ superhero }</h3>
        <ul className='list-group'>
          <li className='list-group-item'><b>Alter ego: </b>{ alter_ego }</li>
          <li className='list-group-item'><b>Publisher: </b>{ publisher }</li>
          <li className='list-group-item'><b>First Appearence: </b>{ first_appearance }</li>
        </ul>

        <h5>Characters</h5>
        <p>{ characters }</p>

        <button
          className='btn btn-outline-info'
          onClick={ handleReturned }
        >
          Regresar
        </button>
      </div>
    </div>
  )
}
