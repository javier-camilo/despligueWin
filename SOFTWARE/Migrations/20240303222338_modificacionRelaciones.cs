using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOFTWARE.Migrations
{
    /// <inheritdoc />
    public partial class modificacionRelaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.RenameColumn(
                name: "TiempoRefHorario",
                table: "Intervalo",
                newName: "TiempoId");

            migrationBuilder.RenameIndex(
                name: "IX_Intervalo_TiempoRefHorario",
                table: "Intervalo",
                newName: "IX_Intervalo_TiempoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoId",
                table: "Intervalo",
                column: "TiempoId",
                principalTable: "Tiempo",
                principalColumn: "RefHorario",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoId",
                table: "Intervalo");

            migrationBuilder.RenameColumn(
                name: "TiempoId",
                table: "Intervalo",
                newName: "TiempoRefHorario");

            migrationBuilder.RenameIndex(
                name: "IX_Intervalo_TiempoId",
                table: "Intervalo",
                newName: "IX_Intervalo_TiempoRefHorario");

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
