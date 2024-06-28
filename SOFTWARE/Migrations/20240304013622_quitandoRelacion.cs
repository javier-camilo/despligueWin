using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOFTWARE.Migrations
{
    /// <inheritdoc />
    public partial class quitandoRelacion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.AlterColumn<string>(
                name: "TiempoRefHorario",
                table: "Intervalo",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo",
                column: "TiempoRefHorario",
                principalTable: "Tiempo",
                principalColumn: "RefHorario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.AlterColumn<string>(
                name: "TiempoRefHorario",
                table: "Intervalo",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo",
                column: "TiempoRefHorario",
                principalTable: "Tiempo",
                principalColumn: "RefHorario",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
