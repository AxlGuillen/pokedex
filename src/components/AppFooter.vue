<template>
    <footer class="footer">
        <p>Made with <span class="heart">♥</span> by <a href="https://axl13.dev/" target="_blank" rel="noopener noreferrer" class="link">Axl</a></p>
    </footer>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #313131;
    color: #fff;
    font-size: 1rem;
    margin-top: auto;
}

.heart {
    color: #EE6B2F;
}

.link {
    color: #30A7D7;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.2s ease;
}

.link:hover {
    color: #5bc8f0;
}
</style>
