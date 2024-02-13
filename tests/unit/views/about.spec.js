import { shallowMount } from '@vue/test-utils'
import About from '@/views/AboutView.vue'
import { test, suite } from "vitest";

suite('Pruebas en el About View', () => {
    
    test('debe de renderizar el componente correctamente', ({ expect }) => {

        const wrapper = shallowMount( About )
        expect( wrapper.html() ).toMatchSnapshot()

    })

})