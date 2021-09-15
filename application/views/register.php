
<p>register box</p>
<p>register username</p>
<p>register password</p>
<p>register password twice</p>
<p>register button</p>


<?= form_open("Register/registerUser") ?>
    <?= form_fieldset("Register credentials"); ?>
        <?= form_label('Username:', 'username'); ?>
        <br>
        <?= form_input(array(
            'name' => 'username',
            'id' => 'username',
            'value' => set_value('username',"") )); ?>
        <br>
        <?= form_label('Password:', 'password'); ?>
        <br>
        <?= form_input( array(
            'name' => 'password',
            'id' => 'password',
            'value' => set_value('password',"") )); ?>
        <br> <br>
        <?= form_submit('registerSubmit', 'Submit'); ?>
    <?= form_fieldset_close(); ?>
<?= form_close() ?>

