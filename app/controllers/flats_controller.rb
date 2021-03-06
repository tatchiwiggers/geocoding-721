class FlatsController < ApplicationController
  before_action :set_flat, only: %i[ show edit update destroy ]

  # GET /flats or /flats.json
  def index
    @flats = Flat.all

    # o metodo `geocoded` filtra os flats que tem coordinates (latitude & longitude)
    # a variável markers é um array de hashes
    # percebam que @flats é um array, porem nos iteramos sobre esse array de
    # flats construindo um hash pra cada flat com chave a valor lat e long.
    # MAP => Cria um novo array contendo os valores retornados pelo bloco.
    @markers = @flats.geocoded.map do |flat|
      {
        lat: flat.latitude,
        lng: flat.longitude,
        # agora nos precisamos criar esse partial info_window 
        # no meu view/flats
        info_window: render_to_string(partial: "info_window", locals: { flat: flat })
        # ir no locahost e verificar que agora temos info window em map.dataset.markers
        # no console do javascript - utilizar esse console pra entender de onde vem 
        # as variaveis do codido doo init_mapbox.js

        # aqui vcs colocam essa linha se quiserem add assets no info window de vcs.
        # o proprio mapbox oferece algumas opções
        # image_url: helpers.asset_url('REPLACE_THIS_WITH_YOUR_IMAGE_IN_ASSETS')
      }
    end
  end

  # GET /flats/1 or /flats/1.json
  def show
  end

  # GET /flats/new
  def new
    @flat = Flat.new
  end

  # GET /flats/1/edit
  def edit
  end

  # POST /flats or /flats.json
  def create
    @flat = Flat.new(flat_params)

    respond_to do |format|
      if @flat.save
        format.html { redirect_to @flat, notice: "Flat was successfully created." }
        format.json { render :show, status: :created, location: @flat }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @flat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /flats/1 or /flats/1.json
  def update
    respond_to do |format|
      if @flat.update(flat_params)
        format.html { redirect_to @flat, notice: "Flat was successfully updated." }
        format.json { render :show, status: :ok, location: @flat }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @flat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /flats/1 or /flats/1.json
  def destroy
    @flat.destroy
    respond_to do |format|
      format.html { redirect_to flats_url, notice: "Flat was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_flat
      @flat = Flat.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def flat_params
      params.require(:flat).permit(:name, :address)
    end
end
