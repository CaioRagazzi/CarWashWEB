<template>
    <div>
        <div class="h-100 bg-plum-plate bg-animation">
            <div class="d-flex h-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="modal-dialog w-100 mx-auto">
                        <div class="modal-content">
                            <div class="modal-body">
                                <div class="h5 modal-title text-center">
                                    <h4 class="mt-2">
                                        <div>Bem Vindo,</div>
                                        <span>Por favor logue em sua conta abaixo.</span>
                                    </h4>
                                </div>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description="Nós nunca vamos compartilhar seu email com ninguem.">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  placeholder="Entre com email...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup2"
                                              label-for="exampleInput2">
                                    <b-form-input id="exampleInput2"
                                                  type="password"
                                                  required
                                                  placeholder="Entre com senha...">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-checkbox name="check" id="exampleCheck">
                                    Me mantenha logado
                                </b-form-checkbox>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Sem conta?
                                    <a href="javascript:void(0);" class="text-primary">Cadastrar</a>
                                </h6>
                            </div>
                            <div class="modal-footer clearfix">
                                <div class="float-left">
                                    <a href="javascript:void(0);" class="btn-lg btn btn-link">Recuperar Senha</a>
                                </div>
                                <div class="float-right">
                                    <b-button variant="primary" @click="login" size="lg">Login</b-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            count: 0
        }
    },
    methods:{
        login: function () {
            console.log('oi');
        }
    }
}
</script>