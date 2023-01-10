<template>
    <!-- from กรอกข้อมูลที่จะค้นหา -->
    <div class="text-center">
        <h2>ค้นหาจาก googlemap</h2>
        <label>สถานที่:</label>
        <input v-model="address" type="text" />
        &nbsp;
        <label>ประเภทธุรกิจ:</label>
        <input v-model="type" type="text" />
        &nbsp;
        <button class="button" @click="Call">Search</button>
    </div>

    <!-- Map -->
    <GMapMap class="GMapMap" :center="center" :options="options" :zoom="15" map-type-id="terrain">
      <GMapMarker :key="index" v-for="(m, index) in markers" :position="m.position" :label="m.label" :clickable="true" @click="center=m.position" />
    </GMapMap>
</template>
<script>
    import axios from 'axios';
    
    export default {
        data() {
            // ตั้งค่าตัวแปรใน default
            return {
                center: { lat: 13.828253, lng: 100.5284507 },
                options: {
                    mapId:'xxx' //here comes your map id
                },
                markers: [],
                query: '',
                results: {},
                address: 'เขตบางซื่อ',
                type: 'ร้านอาหาร',
                radius: 1000,
            };
        },
        methods: {
                // เรียก API จาก backend
                Call() {
                    const url = 'http://localhost:4001/googlemap';
                    axios.post(url, {
                        address: this.address,
                        type: this.type,
                        radius: this.radius,
                    })
                    .then(response => {
                        console.log(response);
                        this.center.lat = response.data.lat;
                        this.center.lng = response.data.lng;
                        this.markers = response.data.array;
                        // console.log(this.markers);
                    })
                    .catch(error => {
                        console.log(error)
                    })
                },
        },
    };
</script>

<!-- ตั้งค่า css -->
<style>
  body {
    margin: 0;
  }

  .GMapMap {
    width: 100vw; 
    height: 30vw;
    padding: 10px;
  }

  .button {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  div {
    border-radius: 5px;
    padding: 20px;
  }
</style>
  