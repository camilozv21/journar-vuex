import cloudinary from 'cloudinary'
import axios from 'axios'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
    cloud_name: 'dgogba6lz',
    api_key: '931748848346276',
    api_secret: 'WPqjyH__kTW12bhSnKf3Doja814'
})

import { test, suite } from "vitest";

suite('Pruebas en el uploadImage ', () => {
    
    test('debe de cargar un archivo y retornar el url', async({ expect }) => {
        
        const { data } = await axios.get('https://res.cloudinary.com/dgogba6lz/image/upload/v1707486963/vue-course/nfpsh1p9gh5v0btttzbh.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')

        const url = await uploadImage( file )

        expect( typeof url ).toBe('string')

        // Tomar el ID
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg','')
        return new Promise((resolve, reject) => {
            cloudinary.v2.api.delete_resources( imageId, {}, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            })
        })
    })
})