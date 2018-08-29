import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  genPets = (pets) => {
    return pets.map(p => {
      return (
        <Pet onAdoptPet={this.props.onAdoptPet} key={p.id} pet={p} />
      )
    })
  }

  render() {
    return <div className="ui cards">{this.genPets(this.props.pets)}</div>
  }
}

export default PetBrowser
