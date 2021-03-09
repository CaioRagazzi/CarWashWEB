<template>
    <div>
        <div class="vh-100 bg-plum-plate bg-animation">
            <div class="d-flex vh-100 justify-content-center align-items-center">
                <b-col md="8" class="mx-auto app-login-box">
                    <div class="modal-dialog w-100">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h5 class="modal-title">
                                    <h4 class="mt-2">
                                        <div>Bem Vindo,</div>
                                        <span>Demora apenas <span class="text-success">alguns segundos</span> para criar sua conta</span>
                                    </h4>
                                </h5>
                                <div class="divider"/>
                                <b-form-group id="exampleInputGroup1"
                                              label-for="exampleInput1"
                                              description="Nós nunca vamos compartilhar seu email com ninguem.">
                                    <b-form-input id="exampleInput1"
                                                  type="email"
                                                  required
                                                  placeholder="Digite seu email..."
                                                  v-model="email">
                                    </b-form-input>
                                </b-form-group>
                                <b-form-group id="exampleInputGroup12"
                                              label-for="exampleInput12">
                                    <b-form-input id="exampleInput12"
                                                  type="text"
                                                  required
                                                  placeholder="Digite o nome do lava rápido..."
                                                  v-model="lavaRapidoName">
                                    </b-form-input>
                                </b-form-group>
                                <div class="row">
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Digite a senha..."
                                                          v-model="password">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6">
                                        <b-form-group id="exampleInputGroup2"
                                                      label-for="exampleInput2">
                                            <b-form-input id="exampleInput2"
                                                          type="password"
                                                          required
                                                          placeholder="Repita a senha..."
                                                          v-model="confirmPassword">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                                <div class="divider"/>
                                <h6 class="mb-0">
                                    Já possui uma conta?
                                    <a href="javascript:void(0);" @click="goToLogin()" class="text-primary">Logar</a>
                                    |
                                    <a href="javascript:void(0);" @click="goToRecovery()" class="text-primary">Recuperar
                                        Senha</a>
                                </h6>
                            </div>
                            <div class="modal-footer d-block text-center">
                                <b-button variant="primary" @click="createAccount" class="btn-wide btn-pill btn-shadow btn-hover-shine"
                                          size="md">
                                          <b-spinner v-if="loading" type="grow" label="Spinning"></b-spinner>
                                          <span v-else>Criar conta</span>
                                </b-button>
                            </div>
                        </div>
                    </div>
                </b-col>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../../Service/axios";

export default {
    data(){
        return {
            loading: false,
            email: 'ca.ragazzi@gmail.com',
            lavaRapidoName: 'iWash',
            password: '123456',
            confirmPassword: '123456',
            // eslint-disable-next-line
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
        }
    },
    methods: {
        createAccount(){
            this.loading = true;
            if (!this.email.trim() || !this.password.trim() || !this.lavaRapidoName.trim() || !this.confirmPassword.trim()) {
                this.makeToast('Favor preencher todos os campos.', 'danger', 'Atenção');
                this.loading = false;
                return;
            }
            if (!this.reg.test(this.email)) {
                this.makeToast('E-mail inválido!', 'danger', 'Atenção');
                this.loading = false;
                return;
            }

            axios.post('usuario/create', {
                usr_email: this.email.trim(),
                usr_lavaRapido: 0,
                usr_nome: null,
                usr_senha: this.password,
                usr_telefone: null,
                usr_tipo: 1,
                lav_nome: this.lavaRapidoName.trim(),
            }).then(async (resUser) => {
                if (resUser.data.err) {
                    if (resUser.data.err.code === 'ER_DUP_ENTRY') {
                        this.makeToast('E-mail já existe!', 'danger', 'Atenção');
                    } else {
                        this.makeToast('Erro!', 'danger', 'Atenção');
                    }
                    this.loading = false;
                } else {
                    this.makeToast('Conta criada com sucesso!', 'success', 'Sucesso');
                    this.$router.push('/');
                }
            }).catch(() => {
                this.makeToast('Erro!', 'danger', 'Atenção');
                this.loading = false;
            });
        },
        makeToast(message, variant, title) {
            this.toastCount++
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 5000,
                variant: variant,
            })
        },
        goToLogin(){
            this.$router.push('/');
        },
        goToRecovery(){
            this.$router.push('forgot-password');
        }
    }
}
</script>
