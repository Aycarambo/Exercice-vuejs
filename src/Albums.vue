<script>
export default {
  props: { user: {} },
  data() {
    return {
      albums: [],
      maximizedAlbum: {
        isAnAlbumSelected: false,
        album: {},
        photos: {},
      },
      photoModal: { show: false, photo: {} },
    };
  },
  computed: {},
  created() {
    fetch(`https://jsonplaceholder.typicode.com/albums`)
      .then((response) => response.json())
      .then((json) => {
        this.albums = json;
      });
  },
  methods: {
    selectAlbum(albumId) {
      this.maximizedAlbum.isAnAlbumSelected = true;
      this.maximizedAlbum.album = this.albums[albumId - 1];
      fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
        .then((response) => response.json())
        .then((json) => {
          this.maximizedAlbum.photos = json;
        });
    },
    unselectAlbum() {
      this.maximizedAlbum.isAnAlbumSelected = false;
      this.maximizedAlbum.album = {};
      this.maximizedAlbum.photos = {};
    },
    selectPhoto(photoId) {
      this.photoModal.show = true;
      fetch(`https://jsonplaceholder.typicode.com/photos?id=${photoId}`)
        .then((response) => response.json())
        .then((json) => {
          this.photoModal.photo = json;
          console.log(this.photoModal.photo);
        });
    },
    unselectPhoto() {
      this.photoModal.show = false;
      this.photoModal.photo = {};
    },
  },
};
</script>

<template>
  <main>
    <button
      @click="unselectAlbum"
      class="reset-button"
      v-if="maximizedAlbum.isAnAlbumSelected"
    >
      See all albums
    </button>
    <div v-if="!maximizedAlbum.isAnAlbumSelected">
      <h3>Albums :</h3>
      <ul>
        <li class="todo flex" v-for="album in albums" :key="album.id">
          <a @click="selectAlbum(album.id)">{{ album.title }}</a>
        </li>
      </ul>
    </div>
    <div v-if="maximizedAlbum.isAnAlbumSelected" class="wrapper">
      <div v-for="photo in maximizedAlbum.photos">
        <img
          class="img"
          @click="selectPhoto(photo.id)"
          :src="photo.thumbnailUrl"
        />
      </div>
    </div>

    <div v-if="photoModal.show" class="photo-modal">
      <button class="back-button" @click="unselectPhoto">⤌</button>
      <img class="modal-img" :src="photoModal.photo[0].url" />
    </div>
  </main>
</template>

<style scoped>
.img {
  cursor: pointer;
}

.modal-img {
  max-width: 600px;
  max-height: 600px;
}

.reset-button {
  cursor: pointer;
  position: fixed;
  z-index: 1000;
  top: 50px;
  right: 0;
  height: 30px;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
}

.photo-modal {
  display: flex;
  align-content: center;
  justify-content: center;
  padding: 40px;
  z-index: 99999;
  position: fixed;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-color: #f2f2f2;
  border-radius: 25px;
  border: 1px solid white;
  text-align: center;
  overflow-y: auto;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 25px;
  border: none;
  background-color: #f2f2f2;
  font-size: 35px;
  cursor: pointer;
}
</style>
