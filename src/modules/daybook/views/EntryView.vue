<template>
  <template v-if="entry">
    <div
      class="entry-tittle d-flex justify-content-between p-2"
      >
      
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
      </div>
    
      <div>

        <input type="file"
          v-show="false"
          ref="imageSelector"
          accept="image/*"
          @change="selectedImage">

        <button 
          v-if="entry.id"
          class="btn btn-danger mx-2"
          @click="deleteEntryById"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
    
        <button class="btn btn-primary"
          @click="onSelectImage">
          Subir foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    
    <hr>
    <div
      class="d-flex flex-column px-3 h-75">
      <textarea 
        v-model="entry.text"
        placeholder="¿Qué sucedió hoy?"
      >
    
    </textarea>
  </div>

  <img 
    v-if="entry.picture && !localImage"
    class="img-thumbnail"
    :src="entry.picture" 
    alt="entry picture">
  <img
    v-if="localImage"
    class="img-thumbnail"
    :src="localImage" 
    alt="entry picture">
    
  </template>

<Fab 
  icon="fa-save"
  @on:click="saveEntry"
/>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex'; //computed
import getDateMonthYear from '../helpers/getDateMonthYear'
import getDayMonthYear from '../helpers/getDateMonthYear';
import uploadImage from '../helpers/uploadImage';
import { mapActions } from 'vuex';
import Swal from 'sweetalert2'

export default {
  name: 'EntryView',

  props: {
    id: {
      type: String,
      required: true
    }
  },
  
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },

  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    }
  },

  computed: {
    ...mapGetters('journal', ['getEntryById']),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDateMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    }
  },

  methods: {
    ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

    loadEntry() {
      let entry

      if(this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id);
        if(!entry) return this.$router.push({ name: 'no-entry' });
      }

      this.entry = entry;
    },

    async saveEntry() {

      new Swal({
        title: 'Guardando...',
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImage(this.file)

      this.entry.picture = picture;

      if(this.entry.id) {
        await this.updateEntry(this.entry );
      } else {
        const routeId = await this.createEntry(this.entry );
        this.$router.push({ name: 'entry', params: { id: routeId } });
      }
      
      window.location.reload();
      this.file = null;
      Swal.fire('Guardado', 'Entrada registrada con éxito', 'success');
    },
    async deleteEntryById() {

      const { isConfirmed } = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar'
      })

      if (isConfirmed) {
        new Swal({
          title: 'Borrando...',
          text: 'Espere por favor',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry({...this.entry});
        this.$router.push({ name: 'no-entry' });

        Swal.fire('Borrado', 'Entrada eliminada con éxito', 'success');
      }

    },
    selectedImage(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return
      };

      this.file = file;

      const fr = new FileReader();
      fr.onload = () => this.localImage = fr.result;
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
    }
  },

  created() {
    this.loadEntry();
  },

  watch: {
    id() {
      this.loadEntry();
    }
  }
}
</script>

<style lang="scss" scoped>
  textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
      outline: none;
    }
  }

  img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  }
</style>