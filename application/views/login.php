<div class='my-3 mx-auto py-3 bg-secondary'>
    <?= form_open("Access/login", array("class" => "form")) ?>
        <?= form_fieldset("Login", array("class" => "d-flex flex-column")); ?>
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
            <div class="form-row">
                <div class="col text-right">
                    <?= form_label('Password:', 'password'); ?>
                </div>
                <div class="col text-left">
                    <?= form_password( array(
                        'name' => 'password',
                        'id' => 'password',
                        'value' => set_value('password',"") )); ?>
                </div>
            </div>

            <div class="form-row">
                <div class="col text-center">
                    <?= form_submit('loginSubmit', 'Submit', array('class' => 'btn btn-success m-3')); ?>
                </div>
            </div>
            <?= validation_errors('<div class="bg-danger my-2">', '</div>'); ?>
    <?= form_fieldset_close(); ?>
    <?= form_close() ?>
</div>
