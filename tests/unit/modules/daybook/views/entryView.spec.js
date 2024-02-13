import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Swal from 'sweetalert2'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView.vue'
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

Swal.fire = () => Promise.resolve({ isConfirmed: true });
Swal.showLoading = () => {};
Swal.close = () => {};

suite('Pruebas en el EntryView', () => {
    
    const store = createVuexStore( journalState )
    store.dispatch = () => {};

    let isPushCalled = false;
    const mockRouter = {
        push: () => { isPushCalled = true; }
    }
    
    let wrapper

    test('debe de sacar al usuario porque el id no existe', ({ expect }) => {
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MfKM6PrX3s9QqURdLx5'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect( isPushCalled ).toBe(false)
    })

    test('debe de mostrar la entrada correctamente', ({ expect }) => {
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MfKM6PrX3s9QqURdLx5'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
        expect( isPushCalled ).toBe(false)
    })

    test('debe de borrar la entrada y salir', async ({ expect }) => {
        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MfKM6PrX3s9QqURdLx5'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

        await wrapper.find('.btn-danger').trigger('click')

        expect( isPushCalled ).toBe(true)
    })
})