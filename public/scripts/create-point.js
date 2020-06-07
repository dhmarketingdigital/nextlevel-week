function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    // .then( (res)=> { return res.json()} ) -- Essa é a forma completa e abaixo a abreviada
    .then( res => res.json() )
    .then ( states => {

        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 

        }

        // ufSelect.innerHTML = ufSelect.innerHTML + '<option value="1">Valor</option>' - Forma completa e acima a abreviada
        
    })
}

populateUFs () 

function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector ("[name=state]")

    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then ( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 

        }

        citySelect.disabled = false
        
    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

 // atualizar o campo escondido com os dados selecionados
 const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function  handleSelectedItem (event) {
    const itemLi = event.target
    // add or remove a class with js
     itemLi.classList.toggle("selected")


    // processo p/ preparar a URL
    
     const itemId = event.target.dataset.id

    //  console.log(`ITEM ID: `, itemId)

    // verificar se existem itens selecionados, se sim 
    // pegar os items selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter ( item =>  {
            const ItemIsDifferent = item != itemId
            return ItemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        // se nao estiver selecionado
        // adicionar a seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

     // atualizar o campo escondido com os dados selecionados
     collectedItems.value = selectedItems
}

   
    


// document
//    .querySelectorAll(".items-grid li")
//    .addEventListener("click", handleSelectedItem)