<template>
    <div class="vh-100 bg-plum-plate bg-animation">
        <div class="d-flex vh-100 justify-content-center align-items-center">
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
                                                placeholder="Entre com email..."
                                                v-model="email">
                                </b-form-input>
                            </b-form-group>
                            <b-form-group id="exampleInputGroup2"
                                            label-for="exampleInput2">
                                <b-form-input id="exampleInput2"
                                                type="password"
                                                required
                                                placeholder="Entre com senha..."
                                                v-model="password">
                                </b-form-input>
                            </b-form-group>
                            <b-form-checkbox name="check" id="exampleCheck">
                                Me mantenha logado
                            </b-form-checkbox>
                            <div class="divider"/>
                            <h6 class="mb-0">
                                Sem conta?
                                <a href="javascript:void(0);" @click="register()" class="text-primary">Cadastrar</a>
                            </h6>
                        </div>
                        <div class="modal-footer clearfix">
                            <div class="float-left">
                                <a href="javascript:void(0);" @click="recoveryPassword" class="btn-md btn btn-link">Recuperar Senha</a>
                            </div>
                            <div class="float-right">
                                <b-button :disabled="loading" class="btn-block" variant="primary" @click="login()" size="md">
                                    <b-spinner v-if="loading" type="grow" label="Spinning"></b-spinner>
                                    <span v-else>Login</span>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
import axios from "../../Service/axios";

export default {
    data: function () {
        return {
            email: 'ca.ragazzi@gmail.com',
            password: '654321',
            loading: false,
            // eslint-disable-next-line
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    methods:{
        login() {
            this.loading = true;
            if (!this.email.trim() || !this.password.trim()) {
                this.makeToast('Favor preencher todos os campos.', 'danger', 'Atenção');
                this.loading = false;
                return;
            }
            if (!this.reg.test(this.email)) {
                this.makeToast('E-mail inválido!', 'danger', 'Atenção');
                this.loading = false;
                return;
            }
            axios.post('/usuario/logarSession', {
                usr_email: this.email.trim(),
                usr_senha: this.password,
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                this.makeToast('Autorizado!', 'success', 'Sucesso!');
            }).catch((err) => {
                if (err.response.status === 401) {
                    this.makeToast('Não Autorizado!', 'danger', 'Atenção');
                } else {
                    this.makeToast('Erro!', 'danger', 'Atenção');
                }
                this.loading = false;
            })
        },
        recoveryPassword(){
            this.$router.push('forgot-password');
        },
        makeToast(message, variant, title) {
            this.toastCount++
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 5000,
                variant: variant,
            })
        },
        register(){
            this.$router.push('register');
        }
    }
}
</script>