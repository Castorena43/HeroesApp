import { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { useForm } from '../../hooks/useForm'
import { getHeroByName } from '../../selectors/getHeroByName'
import { HeroCard } from '../hero/HeroCard'

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search)

  const [ { searchText }, handleInputChange] = useForm({
    searchText: q
  })

  const heroesFiltered = useMemo( () => getHeroByName(q), [q] ) 

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      <h1>Busquedas</h1>

      <div className='row'>
        <div className='col-5'>
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={ handleSubmit }>
            <input
              type="text"
              placeholder='Buscar un heroe'
              className="form-control"
              name="searchText"
              value={ searchText }
              onChange={ handleInputChange }
            />
            <button
              className='btn btn-primary mt-2'
              type='submit'
            >
              Buscar
            </button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Resultados</h4>
          <hr />
          {
            (q === '')  
              ? <div className='alert alert-info'>Buscar un héroe</div>
              : (heroesFiltered.length === 0) && <div className='alert alert-danger'>No hay resultados</div>
          }

          {
            heroesFiltered.map(hero => (
              <HeroCard key={hero.id} {...hero}/>
            ))
          }
        </div>
      </div>
    </>
  )
}
