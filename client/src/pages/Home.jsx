export default function Home () {

    function getForm (e) {
        e.preventDefault ();
        if (document.getElementById ("name").value != "") {
        let data = {
            name : document.getElementById ("name").value
        }
        window.location.href = `http://localhost:5173/room/?name=${data.name}`;
    }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <div className="text-5xl font-bold"> Vamos entrar na sala </div>
                    <p className="py-6"> Tornado é um app de video chamadas desenvolvido as pressas, assim como um avião monomotor. </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> Nome de usuário</span>
                            </label>
                            <form onSubmit = {getForm}>
                                <input type="text" placeholder="nome" className="input input-bordered" id = "name"/>
                                <div className="form-control mt-6">
                                <input type="submit" placeholder="chamada" className="btn btn-primary" id = "token"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
</div>
    );
}