import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    this.getPets()

  }

  getPets = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(r => r.json())
      .then(data =>
        this.setState({
          pets: data
        })
      )
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(r => r.json())
      .then(data =>
        this.setState({
          pets: data
        })
      )
    }
  }

  onChangeType = (e) => {
    const value = e.target.value
    this.setState({
      filters: {
        type: value
      }
    })
  }

  adoptPet = (petid) => {
    this.setState(prevState => ({
      pets: prevState.pets.map(p => {
        if (p.id === petid) {
            let pet = {...p}
            pet.isAdopted = !pet.isAdopted
          return pet
        } else {
          return p
        }
      })
    }))
  }





  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.getPets}  onChangeType={this.onChangeType}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
