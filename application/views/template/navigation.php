<nav class="navbar navbar-expand-lg navbar-light bg-success">
    <a class="navbar-brand" href="<?= base_url() ?>">PCO Trainer</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="container ml-0">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href=<?= base_url() ?>>Trainer</a>
                </li>
                <?php if(isset($_SESSION['isLoggedIn'])): ?>
                    <li class="nav-item">
                        <a class="nav-link" href=<?= base_url() . 'collection'?>>Collection</a>
                    </li>
                <?php endif; ?>
                <li class="nav-item">
                    <a class="nav-link" href=<?= base_url() . 'leaderboard'?>>Leaderboards</a>
                </li>
                <?php if(isset($_SESSION['accessLevel']) && $_SESSION['accessLevel'] == 'admin'): ?>
                    <li class="nav-item">
                        <a class="nav-link" href=<?= base_url() . 'admin'?>>Admin</a>
                    </li>
                <?php endif; ?>
            </ul>
        </div>
        <?php if(isset($_SESSION['isLoggedIn'])): ?>
            <ul class="navbar-nav mr-3">
                <li class="nav-item span">
                    <a class="nav-link" href=<?= base_url() . 'profile'?>>Profile</a>
                </li>
                <li class="nav-item span">
                    <a class="nav-link" href=<?= base_url() . 'access/logout'?>>Logout</a>
                </li>
            </ul>
        <?php else: ?>
            <ul class="navbar-nav mr-3">
                <li class="nav-item span">
                    <a class="nav-link" href=<?= base_url() . 'login'?>>Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href=<?= base_url() . 'register'?>>Register</a>
                </li>
            </ul>
        <?php endif; ?>
</div>
</nav>
<main class="mx-auto text-center">