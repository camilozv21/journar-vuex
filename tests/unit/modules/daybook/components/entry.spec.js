import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mock-data/test-journal-state";
import { test, suite } from "vitest";

suite("Pruebas en Entry Component", () => {

    const mockRouter = {
        push: (...args) => { mockRouter.calls.push(args); }
    };

    const wrapper = shallowMount(Entry, {
        props: {
        entry: journalState.entries[0]
        },
        global: {
        mocks: {
            $router: mockRouter
        }
        }
    });

    test("debe de hacer match con el snapshot", ({ expect }) => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    // test("debe de redireccionar al hacer click en el entry-container", ({ expect }) => {

    //     const entryContainer = wrapper.find('.entry-container')
    //     entryContainer.trigger('click')

    //     expect( mockRouter.push ).toHaveBeenCalledWith({
    //             name: 'entry', 
    //             params: {
    //                 id: journalState.entries[0].id
    //             }
    //         })

    // });

    test("pruebas en las propiedades computadas", ({ expect }) => {

        expect( wrapper.vm.day ).toBe(23)
        expect( wrapper.vm.month ).toBe('Julio')
        expect( wrapper.vm.yearDay ).toBe('2021, Viernes')

    });
});