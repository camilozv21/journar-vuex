import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import EntryList from '@/modules/daybook/components/EntryList.vue'

import { journalState } from '../../../mock-data/test-journal-state'
import { test, suite } from "vitest";

const createVuexStore = ( initialState ) => 
createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

suite('Pruebas en el EntryList', () => {
    
    const store = createVuexStore( journalState )
    const mockRouter = {
        push: (...args) => { mockRouter.calls.push(args); } // Crear un espía manualmente
    }
    mockRouter.calls = []; // Inicializar el array de llamadas
    
    let wrapper

    const setup = () => {
        mockRouter.calls = []; // Limpiar los registros de la función espía
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })
    }

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', ({ expect }) => {
        setup();
        expect( wrapper.findAll('entry-stub').length ).toBe(2)
        expect( wrapper.html() ).toMatchSnapshot()

    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async({ expect }) => {
        setup();
        const input = wrapper.find('input')
        await input.setValue('segunda')

        expect( wrapper.findAll('entry-stub').length ).toBe(1)

    })
    
    test('el boton de nuevo debe de redireccionar a /new', ({ expect }) => {
        setup();
        wrapper.find('button').trigger('click')

        expect( mockRouter.calls[0] ).toEqual([{ name: 'entry', params: { id: 'new' } }])

    })
})