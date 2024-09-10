using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace cafe_employee_management_api.Migrations
{
    public partial class UpdateEmployeeCafeRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cafes_CafeId1",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CafeId1",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CafeId1",
                table: "Employees");

            migrationBuilder.AlterColumn<Guid>(
                name: "CafeId",
                table: "Employees",
                type: "char(36)",
                nullable: false,
                collation: "ascii_general_ci",
                oldClrType: typeof(string),
                oldType: "longtext")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CafeId",
                table: "Employees",
                column: "CafeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees",
                column: "CafeId",
                principalTable: "Cafes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Cafes_CafeId",
                table: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_Employees_CafeId",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "CafeId",
                table: "Employees",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.AddColumn<Guid>(
                name: "CafeId1",
                table: "Employees",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_CafeId1",
                table: "Employees",
                column: "CafeId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Cafes_CafeId1",
                table: "Employees",
                column: "CafeId1",
                principalTable: "Cafes",
                principalColumn: "Id");
        }
    }
}
