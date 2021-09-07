
<p>register box</p>
<p>register username</p>
<p>register password</p>
<p>register password twice</p>
<p>register button</p>

<?= form_open("Register/register") ?>
	<?= form_fieldset("Username"); ?>
	<?= form_label('Username:', 'username'); ?> <br>
	<?= form_input(array('name' => 'username',
	'id' => 'username',
	'value' => set_value('username',"") )); ?> <br>

	<?= form_label('Password:', 'password'); ?> <br>
	<?= form_input(array('name' => 'password',
	'id' => 'password',
	'value' => set_value('password',"") )); ?> <br>

	<?= form_label('Password:', 'password'); ?> <br>
	<?= form_input(array('name' => 'password',
	'id' => 'password',
	'value' => set_value('password',"") )); ?> <br>

	<?= form_submit('loginsubmit', 'Submit'); ?>
<?= form_fieldset_close(); ?>
<?= form_close() ?>

