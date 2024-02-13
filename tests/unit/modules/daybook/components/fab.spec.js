import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'
import { test, suite } from "vitest";

suite('Pruebas en el FAB component', () => {
    
    test('debe de mostrar el ícono por defecto', ({ expect }) => {
        
        const wrapper = shallowMount( Fab )
        const iTag = wrapper.find('i')
        
        expect( iTag.classes('fa-plus') ).toBeTruthy()
    })

    test('debe de mostrar el ícono por argumento: fa-circle', ({ expect }) => {
        
        const wrapper = shallowMount( Fab, {
            props: {
                icon: 'fa-circle'
            }
        })
        const iTag = wrapper.find('i')
        
        expect( iTag.classes('fa-circle') ).toBeTruthy()
    })

    test('debe de emitir el evento on:click cuando se hace click', ({ expect }) => {
        
        const wrapper = shallowMount( Fab )

        wrapper.find('button').trigger('click')

        expect(wrapper.emitted('on:click')).toHaveLength(1)

    })
})