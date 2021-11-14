<div class='my-3 mx-auto py-3 text-center bg-secondary'>
    <?= form_open("Access/register", array('class' => 'form')) ?>
        <?= form_fieldset("Register", array("class" => "d-flex flex-column")); ?>
            <div class="form-row">
                <div class="col text-right">
                    <?= form_label('Username:', 'username'); ?>
                </div>
                <div class="col text-left">
                    <?= form_input(array(
                        'name' => 'username',
                        'id' => 'username',
                        'value' => set_value('username',"") )); ?>
                </div>
            </div>

            <div class="form-row d-flex">
                <div class="col text-right">
                    <?= form_label('Password:', 'password'); ?>
                </div>
                <div class="col text-left">
                    <?= form_password( array(
                        'name' => 'password',
                        'id' => 'password',
                        'value' => set_value('password',"") ), '',''); ?>
                </div>
            </div>

            <div class="form-row">
                <div class="col text-right">
                    <?= form_label('Confirm Password:', 'passwordConfirm'); ?>
                </div>
                <div class="col text-left">
                    <?= form_password( array(
                        'name' => 'passwordConfirm',
                        'id' => 'passwordConfirm',
                        'value' => set_value('password',"") )); ?>
                </div>
            </div>

            <div class="form-row">
                <div class="col text-center">
                    <?= form_submit('registerSubmit', 'Submit', array("class" => "btn btn-success m-3")); ?>
                </div>
            </div>
            <?= validation_errors('<div class="bg-danger my-2">', '</div>'); ?>
            <div class="bg-success my-2">
                <?php if(isset($_SESSION['registerSuccess'])) echo $_SESSION['registerSuccess']  ?>
            </div>
        <?= form_fieldset_close(); ?>
    <?= form_close() ?>
</div>
