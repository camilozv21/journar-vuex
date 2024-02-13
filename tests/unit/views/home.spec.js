import { shallowMount } from '@vue/test-utils'
import Home from '@/views/HomeView.vue'
import { test, suite } from "vitest";

suite('Pruebas en el Home View', () => {
    
    test('debe de renderizar el componente correctamente', ({ expect }) => {
        const wrapper = shallowMount( Home )
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('hacer click en un boton debe de redireccionar a no-entry', ({ expect }) => {
        
        let isPushCalled = false;
        const mockRouter = {
            push: () => { isPushCalled = true; }
        }

        const wrapper = shallowMount( Home, {
            global: {
                mocks: {
                    $router: mockRouter    
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect( isPushCalled ).toBe(true)
    })
})