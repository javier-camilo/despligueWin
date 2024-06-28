using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOFTWARE.Migrations
{
    /// <inheritdoc />
    public partial class cambiosHorario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "fechaInicio",
                table: "Tiempo",
                newName: "HoraInicio");

            migrationBuilder.RenameColumn(
                name: "FechaFinalizacion",
                table: "Tiempo",
                newName: "HoraFinalizacion");

            migrationBuilder.AddColumn<bool>(
                name: "Disponibilidad",
                table: "Tiempo",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "Fecha",
                table: "Tiempo",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "TiempoRefHorario",
                table: "Intervalo",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Intervalo_TiempoRefHorario",
                table: "Intervalo",
                column: "TiempoRefHorario");

            migrationBuilder.AddForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo",
                column: "TiempoRefHorario",
                principalTable: "Tiempo",
                principalColumn: "RefHorario",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Intervalo_Tiempo_TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.DropIndex(
                name: "IX_Intervalo_TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.DropColumn(
                name: "Disponibilidad",
                table: "Tiempo");

            migrationBuilder.DropColumn(
                name: "Fecha",
                table: "Tiempo");

            migrationBuilder.DropColumn(
                name: "TiempoRefHorario",
                table: "Intervalo");

            migrationBuilder.RenameColumn(
                name: "HoraInicio",
                table: "Tiempo",
                newName: "fechaInicio");

            migrationBuilder.RenameColumn(
                name: "HoraFinalizacion",
                table: "Tiempo",
                newName: "FechaFinalizacion");
        }
    }
}
