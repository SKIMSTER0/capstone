<p>login box</p>
<p>login button</p>
<p>login box</p>
<p>login box</p>

<?= form_open("Login/login") ?>
	<?= form_fieldset("Login credentials"); ?>
	<?= form_label('Username:', 'username'); ?> <br>
	<?= form_input(array('name' => 'username',
	'id' => 'username',
	'value' => set_value('username',"") )); ?> <br>
	
	<?= form_label('Password:', 'password'); ?> <br>
	<?= form_input(array('name' => 'password',
	'id' => 'password',
	'value' => set_value('password',"") )); ?> <br>
	<?= form_submit('loginsubmit', 'Submit'); ?>
<?= form_fieldset_close(); ?>
<?= form_close() ?>


