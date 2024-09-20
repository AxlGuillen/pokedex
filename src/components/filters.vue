<script setup>
</script>

<template>
    <div class="main-container">
        <div class="container">
            <button class="btn-surprise">
                <img src="../assets/refresh.png" alt="icon" class="icon" />
                Surprise Me!
            </button>
            <div class="select-wrapper">
                <img src="../assets/pokeball.png" alt="icon" class="select-icon" />
                <select class="select-filter">
                    <option disabled selected>Sort results by</option>
                    <option>Lowest Number (first)</option>
                    <option>Highest Number (last)</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>

.main-container{
    max-width: 850px;
    margin: 10px auto;
}

.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.btn-surprise{
    width: 40%;
    background-color: #30A7D7;
    border: none;
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
}

.btn-surprise:hover{
    background-color: #1B82B1;
}

.select-filter {
    background-color: #313131;
    outline: none;
    width: 100%;
    padding: 10px 10px 10px 40px;
    font-size: 20px;
    color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.select-filter:hover{
    background-color: #282828;
}

.select-wrapper {
    position: relative;
    width: 40%;
}

.select-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    pointer-events: none;
}

/* Estilos para pantallas de tablet (768px a 1024px) */
@media (max-width: 1024px) {
  
    .container{
        flex-direction: column;
        gap: 10px;
    }

    .btn-surprise{
        width: 80%;
        margin: auto;
    }

    .select-wrapper{
        width: 80%;
        margin: auto;
    }

}

/* Estilos para pantallas de móvil (menor a 768px) */
@media (max-width: 768px) {
    .btn-surprise{
        width: 90%;
    }

    .select-wrapper{
        width: 90%;
    }
}

</style>