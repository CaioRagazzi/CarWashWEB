<template>
    <div class="vh-100 bg-plum-plate bg-animation">
        <div class="d-flex vh-100 justify-content-center align-items-center">
            <b-col md="6" class="mx-auto app-login-box">
                <div class="modal-dialog w-100">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="h5 modal-title">
                                Esqueceu a senha?
                                <h6 class="mt-1 mb-0 opacity-8">
                                    <span>Use o formulário abaixo para recuperá-la.</span>
                                </h6>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div>
                                <Form>
                                    <b-row form>
                                        <b-col md="12">
                                            <b-form-group>
                                                <Label for="exampleEmail">Email</Label>
                                                <b-form-input 
                                                    type="email" 
                                                    name="email" 
                                                    id="exampleEmail"
                                                    placeholder="Email aqui..."
                                                    v-model="email"/>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </Form>
                            </div>
                            <div class="divider"/>
                            <h6 class="mb-0">
                                <a href="javascript:void(0);" @click="goBack" class="text-primary">Logar em uma conta existente</a>
                            </h6>
                        </div>
                        <div class="modal-footer clearfix">
                            <div class="float-right">
                                <b-button variant="primary" @click="enviarEmail" size="md">Recuperar Senha</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </b-col>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data(){
        return {
            email: '',
            // eslint-disable-next-line
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            loading: false,
        }
    },
    methods:{
        enviarEmail() {
            this.loading = true;
            if (this.email.trim() === '') {
                this.makeToast('Favor preencher todos os campos.', 'danger', 'Atenção');
                return;
            }

            if (!this.reg.test(this.email)) {
                this.makeToast('E-mail inválido!', 'danger', 'Atenção');
                this.loading = false;
                return;
            }

            axios.post('http://ragazzitech.caioragazzi.com/usuario/recuperacaoSenha', {
                usr_email: this.email.trim(),
            }).then(() => {
                this.makeToast('E-mail enviado!', 'success', 'Sucesso');
                    this.$router.go(-1);
                }).catch((err) => {
                if (err.response.data.message === 'Usuario not found' && err.response.status === 404) {
                    this.makeToast('E-mail inválido!', 'danger', 'Atenção');
                    this.loading = false;
                } else {
                    this.makeToast('Erro!', 'danger', 'Atenção');
                    this.loading = false;
                }
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
        goBack(){
            this.$router.go(-1);
        }
    }
}
</script>
